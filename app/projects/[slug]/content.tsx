"use client";

import { useState } from "react";

import { Box, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";

import { IImage } from "#/interfaces/IImage";
import { UP_LG, UP_SM } from "#/utils/constants";
import { buildMediaCarouselUrls } from "#/utils/media";
import AppImage from "#/ui/AppImage";
import Carroussel from "#/ui/Carroussel";
import type Slider from "react-slick";

interface Props {
  titre: string;
  date?: string | null;
  description?: string | null;
  medias?: IImage[] | null;
}

const formatDate = (value?: string | null) => {
  if (!value) return null;

  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) return null;

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(Date.UTC(year, month - 1, day)));
};

export default function Content({ titre, date, description, medias }: Props) {
  const formattedDate = formatDate(date);
  const carrousselList = buildMediaCarouselUrls(medias);
  const [activeSlide, setActiveSlide] = useState(0);
  const [sliderRef, setSliderRef] = useState<Slider | null>(null);
  const hasMultipleImages = carrousselList.length > 1;

  return (
    <Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "70% 30%" },
          gap: { xs: "2.4rem", lg: "2.4rem" },
          alignItems: "stretch",
        }}
      >
        {carrousselList.length > 0 ? (
          <Box
            sx={{
              order: { xs: 1, lg: 1 },
              width: { xs: "100vw", lg: "100%" },
              marginLeft: { xs: "calc(50% - 50vw)", lg: 0 },
              marginRight: { xs: "calc(50% - 50vw)", lg: 0 },
              ".slick-slider": {
                overflow: "hidden",
                width: "100%",
                height: "auto",
                maxHeight: "1000px",
                objectFit: "cover",
                margin: "0 auto",
                [UP_LG]: {
                  borderTopRightRadius: "8rem",
                  borderBottomLeftRadius: "8rem",
                },
              },
              ".slick-slide img": {
                height: "400px !important",
              },
              [UP_SM]: {
                ".slick-slide img": {
                  height: "800px !important",
                },
              },
            }}
          >
            <Carroussel
              arrows
              list={carrousselList}
              width={850}
              height={800}
              setSliderRef={setSliderRef}
              onSlideChange={setActiveSlide}
            />
          </Box>
        ) : null}

        <Box
          sx={{
            order: { xs: 2, lg: 2 },
            width: "100%",
            maxWidth: { lg: "440px" },
            justifySelf: { lg: "end" },
            alignSelf: { lg: "end" },
            bgcolor: "#fff",
            padding: { xs: "2.4rem", lg: "4rem" },
            borderTopLeftRadius: "4.8rem",
            borderBottomRightRadius: "4.8rem",
            boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
            position: { xs: "static", lg: "sticky" },
            top: { lg: "10rem" },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "2.8rem", lg: "4.8rem" },
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              fontWeight: 300,
              textTransform: "capitalize",
            }}
          >
            {titre}
          </Typography>

          {formattedDate && (
            <Typography
              sx={{
                marginTop: "1.6rem",
                fontSize: "1.4rem",
                color: "text.secondary",
              }}
            >
              {formattedDate}
            </Typography>
          )}

          {description && (
            <Box
              sx={{
                marginTop: "2.4rem",
                p: { textAlign: "justify", textJustify: "inter-word" },
                h1: { marginBottom: "1.6rem" },
                h2: { marginBottom: "1.6rem" },
              }}
            >
              <ReactMarkdown>{description}</ReactMarkdown>
            </Box>
          )}
        </Box>
      </Box>

      {hasMultipleImages ? (
        <Box
          sx={{
            display: { xs: "none", lg: "flex" },
            width: { xs: "100vw", lg: "70%" },
            marginLeft: { xs: "calc(50% - 50vw)", lg: 0 },
            marginRight: { xs: "calc(50% - 50vw)", lg: 0 },
            justifyContent: "center",
          }}
        >
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
            {carrousselList.map((src, idx) => (
              <Box
                key={`thumbnail-${idx}`}
                component="button"
                type="button"
                onClick={() => sliderRef?.slickGoTo(idx)}
                sx={{
                  border: "2px solid",
                  borderColor: idx === activeSlide ? "#6B4423" : "rgba(107,68,35,0.2)",
                  bgcolor: "transparent",
                  padding: 0,
                  cursor: "pointer",
                  borderRadius: "1.2rem",
                  overflow: "hidden",
                  position: "relative",
                  opacity: idx === activeSlide ? 1 : 0.7,
                  transform: idx === activeSlide ? "scale(1.05)" : "scale(1)",
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
                  fill
                  sizes="80px"
                  style={{ objectFit: "cover" }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      ) : null}
    </Box>
  );
}
