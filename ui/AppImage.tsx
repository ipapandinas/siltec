"use client";

import {
  cloudinaryResponsiveTransform,
  injectCloudinaryTransforms,
  isCloudinaryUrl,
} from "#/utils/cloudinary";
import { rgbDataURL } from "#/utils/strings";
import Image, { type ImageProps } from "next/image";

const BASIC_IMAGE_SIZES =
  "(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw";
const MEDIUM_IMAGE_SIZES =
  "(max-width: 768px) 50vw,(max-width: 1200px) 28vw,16vw";
const SMALL_IMAGE_SIZES =
  "(max-width: 768px) 20vw,(max-width: 1200px) 10vw,5vw";

interface Props extends ImageProps {
  loadMode?: "sm" | "md" | "lg";
  disableCloudinaryTransform?: boolean;
}

export default function AppImage(props: Props) {
  const defaultSizes =
    props.loadMode === "sm"
      ? SMALL_IMAGE_SIZES
      : props.loadMode === "md"
        ? MEDIUM_IMAGE_SIZES
        : BASIC_IMAGE_SIZES;

  const copy = { ...props };
  delete copy.loadMode;
  delete copy.disableCloudinaryTransform;

  const widthForTransform =
    typeof props.width === "number"
      ? props.width
      : props.loadMode === "sm"
        ? 320
        : props.loadMode === "md"
          ? 740
          : 1200;

  const transformedSrc =
    typeof props.src === "string" &&
    isCloudinaryUrl(props.src) &&
    !props.disableCloudinaryTransform
      ? injectCloudinaryTransforms(
          props.src,
          cloudinaryResponsiveTransform(
            widthForTransform,
            typeof props.quality === "number" ? props.quality : undefined
          )
        )
      : props.src;

  const defaultBlurDataURL = rgbDataURL(233, 243, 240);

  const numericWidth = typeof props.width === "number" ? props.width : null;
  const numericHeight = typeof props.height === "number" ? props.height : null;
  const shouldUseBlurBySize =
    numericWidth === null || numericHeight === null
      ? true
      : Math.min(numericWidth, numericHeight) >= 40;

  const resolvedPlaceholder =
    props.placeholder ?? (shouldUseBlurBySize ? "blur" : "empty");
  const resolvedBlurDataURL =
    resolvedPlaceholder === "blur"
      ? (props.blurDataURL ?? defaultBlurDataURL)
      : undefined;

  const mergedStyle = {
    opacity: resolvedPlaceholder === "blur" ? 1 : 0,
    transition: "opacity 320ms ease",
    ...(props.style ?? {}),
  };

  return (
    <Image
      {...copy}
      src={transformedSrc}
      alt={props.alt ? props.alt : "Image descriptive text"}
      unoptimized={props.unoptimized ?? true}
      placeholder={resolvedPlaceholder}
      blurDataURL={resolvedBlurDataURL}
      sizes={props.sizes !== undefined ? props.sizes : defaultSizes}
      priority={props.priority !== undefined ? props.priority : false}
      draggable={props.draggable !== undefined ? props.draggable : false}
      style={mergedStyle}
      onLoad={(event) => {
        event.currentTarget.style.opacity = "1";
        props.onLoad?.(event);
      }}
      onError={(event) => {
        event.currentTarget.style.opacity = "1";
        props.onError?.(event);
      }}
    />
  );
}
