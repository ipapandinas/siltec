"use client";

import Slider from "react-slick";

import AppImage from "./AppImage";

interface Props {
  list: string[];
}

export default function Carroussel({ list }: Props) {
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
      {list.map((src, idx) => (
        <AppImage
          key={idx}
          alt={`carroussel-image-${idx}`}
          src={src}
          width={1200}
          height={800}
        />
      ))}
    </Slider>
  );
}
