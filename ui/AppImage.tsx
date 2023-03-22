import { rgbDataURL } from "#/utils/strings";
import Image, { ImageProps } from "next/image";

const BASIC_IMAGE_SIZES =
  "(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw";
const MEDIUM_IMAGE_SIZES =
  "(max-width: 768px) 50vw,(max-width: 1200px) 28vw,16vw";
const SMALL_IMAGE_SIZES =
  "(max-width: 768px) 20vw,(max-width: 1200px) 10vw,5vw";

interface Props extends ImageProps {
  loadMode?: "sm" | "md" | "lg";
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
  return (
    <Image
      {...copy}
      alt={props.alt ? props.alt : "Image descriptive text"}
      unoptimized={props.unoptimized !== undefined ? props.unoptimized : false}
      sizes={props.sizes !== undefined ? props.sizes : defaultSizes}
      priority={props.priority !== undefined ? props.priority : false}
      draggable={props.draggable !== undefined ? props.draggable : false}
      placeholder="blur"
      blurDataURL={rgbDataURL(233, 243, 240)}
    />
  );
}
