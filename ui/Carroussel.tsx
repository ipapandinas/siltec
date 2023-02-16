"use client";

import Image from "next/image";
import Slider from "react-slick";

interface Props {
  list: string[];
}

export default function Carrousel({ list }: Props) {
  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...sliderSettings}>
      {list.map((src, idx) => (
        <Image
          key={idx}
          alt={`carrousel-image-${idx}`}
          src={src}
          width={1200}
          height={800}
        />
      ))}
    </Slider>
  );
}
