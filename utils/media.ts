import { IImage } from "#/interfaces/IImage";
import { API_URL } from "#/utils/constants";
import cloudinary from "#/utils/cloudinary";

const ABSOLUTE_URL_REGEX = /^https?:\/\//i;

export function resolveImageUrl(image: IImage | null | undefined): string | null {
  if (!image) return null;

  if (image.hash) {
    return cloudinary.image(image.hash).toURL();
  }

  const url = image.url?.trim();

  if (!url) return null;

  if (ABSOLUTE_URL_REGEX.test(url)) return url;
  if (url.startsWith("/uploads") && API_URL) return `${API_URL}${url}`;

  return url;
}
