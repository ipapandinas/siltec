"use client";

import { Box, BoxProps as MuiBoxProps } from "@mui/material";
import Slider from "react-slick";

import AppImage from "./AppImage";

interface Props extends MuiBoxProps {
  list: string[];
}

export default function Carroussel(props: Props) {
  const propsCopy = { ...props };
  const sliderSettings = {
    arrows: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...sliderSettings}>
      {props.list.map((src, idx) => (
        <Box
          key={idx}
          sx={{
            ...propsCopy.sx,
          }}
        >
          <AppImage
            alt={`carroussel-image-${idx}`}
            src={src}
            width={1200}
            height={800}
          />
        </Box>
      ))}
    </Slider>
  );
}
