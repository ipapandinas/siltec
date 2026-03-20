import { IImage } from "#/interfaces/IImage";
import { API_URL } from "#/utils/constants";
import cloudinary, {
  cloudinaryThumbUrl,
  injectCloudinaryTransforms,
  isCloudinaryUrl,
} from "#/utils/cloudinary";

const ABSOLUTE_URL_REGEX = /^https?:\/\//i;
const CARD_THUMBNAIL_TRANSFORMS = "f_auto,q_auto:eco,c_fill,g_auto,w_370,h_380";

export function resolveImageUrl(image: IImage | null | undefined): string | null {
  if (!image) return null;

  const url = image.url?.trim();

  if (url) {
    if (ABSOLUTE_URL_REGEX.test(url)) return url;
    if (url.startsWith("/uploads") && API_URL) return `${API_URL}${url}`;

    return url;
  }

  if (image.hash) {
    return cloudinary.image(image.hash).toURL();
  }

  return null;
}

export function resolveCardImageUrl(image: IImage | null | undefined): string | null {
  if (!image) return null;

  const resolvedUrl = resolveImageUrl(image);

  if (!resolvedUrl) {
    if (image.hash) {
      return cloudinaryThumbUrl(image.hash, { width: 370, height: 380 });
    }

    return null;
  }

  if (isCloudinaryUrl(resolvedUrl)) {
    return injectCloudinaryTransforms(resolvedUrl, CARD_THUMBNAIL_TRANSFORMS);
  }

  return resolvedUrl;
}

export function buildMediaCarouselUrls(medias: IImage[] | null | undefined): string[] {
  const mediaList = (medias ?? [])
    .map((item) => resolveImageUrl(item))
    .filter((url): url is string => Boolean(url));

  return Array.from(new Set(mediaList));
}
