/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";

import { rgbDataURL } from "#/utils/strings";
import { Box, BoxProps as MuiBoxProps } from "@mui/material";
import Slider from "react-slick";

import AppImage from "./AppImage";

interface Props extends MuiBoxProps {
  list: string[];
  width?: number;
  height?: number;
  quality?: number;
  isHero?: boolean;
  arrows?: boolean;
  showThumbnails?: boolean;
  onSlideChange?: (index: number) => void;
  setSliderRef?: (slider: Slider | null) => void;
}

export default function Carroussel(props: Props) {
  const {
    list,
    width,
    height,
    quality = undefined,
    isHero = false,
    arrows = false,
    showThumbnails = false,
    onSlideChange,
    setSliderRef,
  } = props;
  const propsCopy = { ...props };
  const sliderRef = useRef<Slider | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const hasMultipleImages = list.length > 1;

  useEffect(() => {
    if (!setSliderRef) return;
    setSliderRef(sliderRef.current);

    return () => {
      setSliderRef(null);
    };
  }, [setSliderRef]);

  const sliderSettings = {
    arrows: arrows && hasMultipleImages,
    infinite: hasMultipleImages,
    autoplay: hasMultipleImages,
    speed: 1000,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_: number, next: number) => {
      setCurrentSlide(next);
      onSlideChange?.(next);
    },
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

  const arrowStyles: MuiBoxProps["sx"] = arrows && hasMultipleImages
    ? {
        ".slick-prev, .slick-next": {
          zIndex: 2,
          width: { xs: "4rem", lg: "4.8rem" },
          height: { xs: "4rem", lg: "4.8rem" },
          borderRadius: "50%",
          bgcolor: "rgba(255,255,255,0.9)",
          boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
          border: "1px solid rgba(0,0,0,0.06)",
          opacity: 1,
          transition: "all .2s ease",
          "&:focus, &:active": {
            bgcolor: "rgba(255,255,255,0.9)",
            opacity: 1,
          },
          "&:hover": {
            opacity: 0.75,
            bgcolor: "#fff",
            boxShadow: "0 6px 16px rgba(0,0,0,0.16)",
          },
        },
        ".slick-prev": {
          left: { xs: "1.2rem", lg: "2.2rem" },
        },
        ".slick-next": {
          right: { xs: "1.2rem", lg: "2.2rem" },
        },
        ".slick-prev:before, .slick-next:before": {
          color: "rgba(0,0,0,0.75)",
          opacity: 1,
          fontSize: { xs: "2rem", lg: "2.4rem" },
          lineHeight: 1,
          position: "absolute",
          top: "43%",
          left: "50%",
          transform: "translate(-50%, -56%)",
        },
        ".slick-prev:before": {
          content: '"‹"',
        },
        ".slick-next:before": {
          content: '"›"',
        },
      }
    : undefined;

  return (
    <Box sx={arrowStyles}>
      <Slider ref={sliderRef} {...sliderSettings}>
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
              quality={isHero ? 100 : quality}
              loadMode={isHero ? "lg" : undefined}
              unoptimized={isHero}
              placeholder="blur"
              blurDataURL={rgbDataURL(233, 243, 240)}
            />
          </Box>
        ))}
      </Slider>

      {showThumbnails && hasMultipleImages ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              mt: "1.6rem",
              display: "inline-flex",
              gap: { xs: "1rem", lg: "1.4rem" },
              p: { xs: "1rem", lg: "1.4rem" },
              flexWrap: "nowrap",
              overflowX: "auto",
              borderRadius: "1.6rem",
              bgcolor: "#fff",
              boxShadow: "0 10px 24px rgba(0,0,0,0.1)",
              border: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            {list.map((src, idx) => (
              <Box
                key={`thumbnail-${idx}`}
                component="button"
                type="button"
                onClick={() => sliderRef.current?.slickGoTo(idx)}
                sx={{
                  border: "2px solid",
                  borderColor:
                    idx === currentSlide ? "#6B4423" : "rgba(107,68,35,0.2)",
                  bgcolor: "transparent",
                  padding: 0,
                  cursor: "pointer",
                  borderRadius: "1.2rem",
                  overflow: "hidden",
                  opacity: idx === currentSlide ? 1 : 0.7,
                  transform: idx === currentSlide ? "scale(1.05)" : "scale(1)",
                  transition: "all .2s ease",
                  minWidth: { xs: "64px", lg: "80px" },
                  width: { xs: "64px", lg: "80px" },
                  height: { xs: "64px", lg: "80px" },
                  flexShrink: 0,
                }}
              >
                <AppImage
                  alt={`carroussel-thumbnail-${idx}`}
                  src={src}
                  width={80}
                  height={80}
                  quality={80}
                />
              </Box>
            ))}
          </Box>
        </Box>
      ) : null}
    </Box>
  );
}
