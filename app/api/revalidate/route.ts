import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

type RevalidationPayload = {
  model?: string;
  uid?: string;
  entry?: {
    slug?: string;
  };
  data?: {
    model?: string;
    uid?: string;
    entry?: {
      slug?: string;
    };
  };
};

function normalizeModel(model?: string): string {
  if (!model) return "";
  return model.split(".").pop()?.toLowerCase() ?? "";
}

function extractModel(payload: RevalidationPayload): string {
  return normalizeModel(
    payload.model ?? payload.uid ?? payload.data?.model ?? payload.data?.uid
  );
}

function extractSlug(payload: RevalidationPayload): string | null {
  const slug = payload.entry?.slug ?? payload.data?.entry?.slug;
  const trimmed = slug?.trim();
  return trimmed ? trimmed : null;
}

function isAuthorized(request: NextRequest, secret: string): boolean {
  const authHeader = request.headers.get("authorization");
  const bearerSecret = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;
  const querySecret = request.nextUrl.searchParams.get("secret");

  return bearerSecret === secret || querySecret === secret;
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
    logInfo("Fallback layout revalidation (missing model)");
    return NextResponse.json({
      model: null,
      revalidated: ["/ (layout)"],
      success: true,
      fallback: true,
    });
  }

  const pathsToRevalidate = new Set<string>();

  switch (model) {
    case "product":
      if (slug) {
        pathsToRevalidate.add(`/p/${slug}`);
      }
      pathsToRevalidate.add("/");
      break;

    case "project":
      if (slug) {
        pathsToRevalidate.add(`/projects/${slug}`);
      }
      pathsToRevalidate.add("/projects");
      pathsToRevalidate.add("/");
      break;

    case "collection":
      if (slug) {
        pathsToRevalidate.add(`/c/${slug}`);
      }
      pathsToRevalidate.add("/collections");
      pathsToRevalidate.add("/");
      break;

    case "brand":
      pathsToRevalidate.add("/brands");
      pathsToRevalidate.add("/");
      break;

    default:
      revalidatePath("/", "layout");
      logInfo("Fallback layout revalidation (unknown model)", { model });
      return NextResponse.json({
        revalidated: ["/ (layout)"],
        model,
        success: true,
      });
  }

  const revalidatedPaths = Array.from(pathsToRevalidate);

  pathsToRevalidate.forEach((path) => {
    revalidatePath(path);
  });

  logInfo("Webhook revalidation completed", {
    model,
    slug,
    revalidatedPaths,
  });

  return NextResponse.json({
    model,
    revalidated: revalidatedPaths,
    success: true,
  });
}
