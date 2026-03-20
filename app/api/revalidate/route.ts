import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

type RevalidationPayload = {
  model?: unknown;
  uid?: unknown;
  entry?: {
    slug?: unknown;
  };
  data?: {
    model?: unknown;
    uid?: unknown;
    entry?: {
      slug?: unknown;
    };
  };
};

type CanonicalModel =
  | "product"
  | "project"
  | "collection"
  | "brand"
  | "typology"
  | "new"
  | "navigation"
  | "homepage"
  | "carroussel"
  | "hub-de-collection"
  | "hub-de-realisation"
  | "hub-d-actualite";

type RevalidationTarget = {
  paths: string[];
  revalidateLayout: boolean;
  revalidatePage: boolean;
};

const MODEL_ALIASES: Record<string, CanonicalModel> = {
  news: "new",
  homepages: "homepage",
  "home-page": "homepage",
  carroussels: "carroussel",
  hubdecollection: "hub-de-collection",
  hubderealisation: "hub-de-realisation",
  hubdactualite: "hub-d-actualite",
};

const SAFE_SLUG_REGEX = /^[a-z0-9-]+$/;

function normalizeModelValue(value: unknown): string {
  if (typeof value !== "string") return "";

  const rightMostSegment = value
    .trim()
    .toLowerCase()
    .replace(/^api::/, "")
    .split(".")
    .pop() ?? "";

  return rightMostSegment
    .replace(/[\s_]+/g, "-")
    .replace(/[’'`]/g, "")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeModel(model: unknown): CanonicalModel | null {
  const normalized = normalizeModelValue(model);
  if (!normalized) return null;

  const squashed = normalized.replace(/-/g, "");
  const canonical = MODEL_ALIASES[normalized] ?? MODEL_ALIASES[squashed] ?? normalized;

  switch (canonical) {
    case "product":
    case "project":
    case "collection":
    case "brand":
    case "typology":
    case "new":
    case "navigation":
    case "homepage":
    case "carroussel":
    case "hub-de-collection":
    case "hub-de-realisation":
    case "hub-d-actualite":
      return canonical;
    default:
      return null;
  }
}

function extractModel(payload: RevalidationPayload): CanonicalModel | null {
  const rawModel = payload.model ?? payload.uid ?? payload.data?.model ?? payload.data?.uid;
  return normalizeModel(rawModel);
}

function extractSlug(payload: RevalidationPayload): string | null {
  const slugValue = payload.entry?.slug ?? payload.data?.entry?.slug;
  if (typeof slugValue !== "string") return null;

  const slug = slugValue.trim().toLowerCase();
  if (!slug) return null;

  return SAFE_SLUG_REGEX.test(slug) ? slug : null;
}

function getTargets(model: CanonicalModel, slug: string | null): RevalidationTarget {
  const paths = new Set<string>();
  let revalidateLayout = false;
  let revalidatePage = false;

  switch (model) {
    case "product":
      paths.add(slug ? `/p/${slug}` : "/p/[slug]");
      paths.add("/b/[brandSlug]");
      paths.add("/c/[collectionSlug]/[typologySlug]");
      paths.add("/");
      break;

    case "project":
      paths.add(slug ? `/projects/${slug}` : "/projects/[slug]");
      paths.add("/projects");
      paths.add("/");
      break;

    case "collection":
      paths.add(slug ? `/c/${slug}` : "/c/[collectionSlug]");
      paths.add("/c/[collectionSlug]/[typologySlug]");
      paths.add("/collections");
      paths.add("/");
      break;

    case "brand":
      paths.add(slug ? `/b/${slug}` : "/b/[brandSlug]");
      paths.add("/brands");
      paths.add("/");
      break;

    case "typology":
      paths.add("/c/[collectionSlug]");
      paths.add("/c/[collectionSlug]/[typologySlug]");
      paths.add("/p/[slug]");
      break;

    case "new":
      paths.add(slug ? `/news/${slug}` : "/news/[slug]");
      paths.add("/news");
      paths.add("/");
      break;

    case "navigation":
      revalidateLayout = true;
      break;

    case "homepage":
    case "carroussel":
      paths.add("/");
      revalidatePage = true;
      revalidateLayout = true;
      break;

    case "hub-de-collection":
      paths.add("/collections");
      paths.add("/c/[collectionSlug]");
      paths.add("/c/[collectionSlug]/[typologySlug]");
      paths.add("/p/[slug]");
      break;

    case "hub-de-realisation":
      paths.add("/projects");
      break;

    case "hub-d-actualite":
      paths.add("/news");
      paths.add("/news/[slug]");
      break;
  }

  return {
    paths: Array.from(paths).sort(),
    revalidateLayout,
    revalidatePage,
  };
}

function isAuthorized(request: NextRequest, secret: string): boolean {
  const authHeader = request.headers.get("authorization");
  const bearerSecret = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;
  const headerSecret = request.headers.get("x-revalidation-secret");
  const querySecret = request.nextUrl.searchParams.get("secret");

  return (
    bearerSecret === secret ||
    headerSecret === secret ||
    querySecret === secret
  );
}

function logWarn(message: string, meta?: unknown) {
  if (meta !== undefined) {
    console.warn(`[revalidate] ${message}`, meta);
    return;
  }

  console.warn(`[revalidate] ${message}`);
}

function logInfo(message: string, meta?: unknown) {
  if (meta !== undefined) {
    console.info(`[revalidate] ${message}`, meta);
    return;
  }

  console.info(`[revalidate] ${message}`);
}

export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATION_SECRET;

  if (!secret) {
    logWarn("REVALIDATION_SECRET is not configured");
    return NextResponse.json(
      { error: "REVALIDATION_SECRET is not configured" },
      { status: 500 }
    );
  }

  if (!isAuthorized(request, secret)) {
    logWarn("Unauthorized webhook call");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload: RevalidationPayload;

  try {
    payload = await request.json();
  } catch {
    logWarn("Malformed JSON body");
    return NextResponse.json(
      { error: "Malformed JSON body" },
      { status: 400 }
    );
  }

  const model = extractModel(payload);
  const slug = extractSlug(payload);

  if (!model) {
    revalidatePath("/", "layout");
    logInfo("Fallback layout revalidation (missing or unknown model)");
    return NextResponse.json({
      model: null,
      revalidated: ["/ (layout)"],
      success: true,
      fallback: true,
    });
  }

  const { paths, revalidateLayout, revalidatePage } = getTargets(model, slug);

  for (const path of paths) {
    if (path.includes("[")) {
      revalidatePath(path, "page");
    } else {
      revalidatePath(path);
    }
  }

  if (revalidatePage) {
    revalidatePath("/", "page");
  }

  if (revalidateLayout) {
    revalidatePath("/", "layout");
  }

  const revalidated = [
    ...paths,
    ...(revalidatePage ? ["/ (page)"] : []),
    ...(revalidateLayout ? ["/ (layout)"] : []),
  ];

  logInfo("Webhook revalidation completed", {
    model,
    slug,
    revalidatedPaths: revalidated,
  });

  return NextResponse.json({
    model,
    revalidated,
    success: true,
  });
}
