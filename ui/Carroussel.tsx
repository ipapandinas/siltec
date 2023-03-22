/* eslint-disable @next/next/no-img-element */
"use client";

import { rgbDataURL } from "#/utils/strings";
import { Box, BoxProps as MuiBoxProps } from "@mui/material";
import Slider from "react-slick";

import AppImage from "./AppImage";

interface Props extends MuiBoxProps {
  list: string[];
  width?: number;
  height?: number;
  isHero?: boolean;
}

export default function Carroussel(props: Props) {
  const { list, width, height, isHero = false } = props;
  const propsCopy = { ...props };
  const sliderSettings = {
    arrows: false,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const cropSrc = (src: string) => {
    const decodedString = decodeURIComponent(src);

    const uploadIndex = decodedString.indexOf("upload/");
    if (uploadIndex >= 0) {
      const newString =
        decodedString.substring(0, uploadIndex + 7) +
        `c_crop,h_${height ?? 800},q_80,w_${width ?? 1800}/` +
        decodedString.substring(uploadIndex + 7);
      return newString;
    }
    return src;
  };

  return (
    <Slider {...sliderSettings}>
      {list.map((src, idx) => (
        <Box
          key={idx}
          sx={{
            ...propsCopy.sx,
          }}
        >
          <AppImage
            alt={`carroussel-image-${idx}`}
            src={isHero ? cropSrc(src) : src}
            width={width ?? 1800}
            height={height ?? 800}
            quality={isHero ? 100 : undefined}
            loadMode={isHero ? "lg" : undefined}
            unoptimized={isHero}
            placeholder="blur"
            blurDataURL={rgbDataURL(233, 243, 240)}
          />
        </Box>
      ))}
    </Slider>
  );
}
