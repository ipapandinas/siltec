import { Cloudinary } from "@cloudinary/url-gen";

const CLOUDINARY_UPLOAD_PATH = "/image/upload/";

export const cloudinary = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_NAME || "",
  },
  url: {
    secure: true,
    analytics: false,
  },
});

export function isCloudinaryUrl(url: string): boolean {
  try {
    const parsed = new URL(url);

    return (
      parsed.hostname === "res.cloudinary.com" &&
      parsed.pathname.includes(CLOUDINARY_UPLOAD_PATH)
    );
  } catch {
    return false;
  }
}

const CLOUDINARY_TRANSFORM_KEYS = new Set([
  "a",
  "ac",
  "af",
  "ar",
  "b",
  "bo",
  "c",
  "co",
  "d",
  "dl",
  "dpr",
  "e",
  "f",
  "fl",
  "fn",
  "g",
  "h",
  "ki",
  "l",
  "o",
  "p",
  "pg",
  "q",
  "r",
  "so",
  "sp",
  "t",
  "u",
  "vc",
  "w",
  "x",
  "y",
  "z",
]);

function isLikelyTransformSegment(segment: string): boolean {
  const normalized = segment.trim();
  if (!normalized) return false;

  if (!normalized.includes("_")) return false;

  const parts = normalized.split(",").map((part) => part.trim()).filter(Boolean);
  if (parts.length === 0) return false;

  return parts.every((part) => {
    const separatorIndex = part.indexOf("_");
    if (separatorIndex <= 0) return false;

    const key = part.slice(0, separatorIndex);
    return CLOUDINARY_TRANSFORM_KEYS.has(key);
  });
}

function hasExistingTransformSegment(pathAfterUpload: string): boolean {
  const segments = pathAfterUpload.split("/").map((segment) => segment.trim());
  const firstSegment = segments[0] ?? "";
  const secondSegment = segments[1] ?? "";

  if (!firstSegment) return false;

  // /upload/v123/public_id => no transform segment yet
  if (/^v\d+$/.test(firstSegment)) return false;

  // /upload/public_id => no transform segment yet
  if (segments.length === 1) return false;

  // Be conservative to avoid treating public IDs as transforms.
  const hasCommaSeparatedOps = firstSegment.includes(",");
  const hasVersionAfterFirst = /^v\d+$/.test(secondSegment);

  return isLikelyTransformSegment(firstSegment) && (hasCommaSeparatedOps || hasVersionAfterFirst);
}

export function injectCloudinaryTransforms(url: string, transforms: string): string {
  if (!isCloudinaryUrl(url) || !transforms.trim()) return url;

  const uploadIndex = url.indexOf(CLOUDINARY_UPLOAD_PATH);

  if (uploadIndex < 0) return url;

  const before = url.slice(0, uploadIndex + CLOUDINARY_UPLOAD_PATH.length);
  const after = url.slice(uploadIndex + CLOUDINARY_UPLOAD_PATH.length);

  if (hasExistingTransformSegment(after)) {
    return url;
  }

  return `${before}${transforms}/${after}`;
}

function encodePublicId(publicId: string): string {
  return publicId
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

export function cloudinaryResponsiveTransform(width: number, quality?: number): string {
  const safeWidth = Math.max(1, Math.round(width));

  if (typeof quality === "number") {
    const safeQuality = Math.max(10, Math.min(100, Math.round(quality)));

    return `f_auto,q_${safeQuality},c_limit,w_${safeWidth}`;
  }

  return `f_auto,q_auto:eco,c_limit,w_${safeWidth}`;
}

export function cloudinaryThumbUrl(
  publicId: string,
  opts: { width: number; height: number }
): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME?.trim();

  if (!cloudName) {
    return cloudinary.image(publicId).toURL();
  }

  const { width, height } = opts;
  const safeWidth = Math.max(1, Math.round(width));
  const safeHeight = Math.max(1, Math.round(height));

  return `https://res.cloudinary.com/${cloudName}${CLOUDINARY_UPLOAD_PATH}f_auto,q_auto:eco,c_fill,g_auto,w_${safeWidth},h_${safeHeight}/${encodePublicId(publicId)}`;
}

export default cloudinary;
