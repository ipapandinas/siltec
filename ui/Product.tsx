"use client";

import { useState } from "react";

import ReactMarkdown from "react-markdown";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { darken } from "@mui/material/styles";

import { IProduct } from "#/interfaces/IProduct";
import { buildMediaCarouselUrls } from "#/utils/media";
import { COLOR_PRIMARY_MAIN, UP_LG, UP_SM } from "#/utils/constants";

import AppLink from "./AppLink";
import type Slider from "react-slick";

import Carroussel from "./Carroussel";

interface IProps {
  product: IProduct;
  quoteButtonColor?: string | null;
  brandHref?: string | null;
}

export default function Product({ product, quoteButtonColor, brandHref }: IProps) {
  const theme = useTheme();
  const {
    annee,
    marque,
    description,
    designer,
    dimensions,
    image,
    medias,
    titre,
  } = product;

  const relationBrandName = marque?.nom?.trim() || null;

  const carrousselList = buildMediaCarouselUrls(image, medias);
  const [activeSlide, setActiveSlide] = useState(0);
  const [sliderRef, setSliderRef] = useState<Slider | null>(null);
  const hasMultipleImages = carrousselList.length > 1;

  const resolvedButtonColor = quoteButtonColor || COLOR_PRIMARY_MAIN;
  const resolvedButtonHoverColor = darken(resolvedButtonColor, 0.2);
  const resolvedButtonTextColor = theme.palette.getContrastText(resolvedButtonColor);
  const resolvedButtonHoverTextColor =
    theme.palette.getContrastText(resolvedButtonHoverColor);

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
              quality={100}
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
            fontSize: "0.9rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "text.secondary",
          }}
        >
          {relationBrandName ? (
            brandHref ? (
              <AppLink
                href={brandHref}
                sx={{
                  color: "text.secondary",
                  textDecoration: "underline",
                  textUnderlineOffset: "0.2rem",
                  "&:hover": { opacity: 0.8 },
                }}
              >
                {relationBrandName}
              </AppLink>
            ) : (
              relationBrandName
            )
          ) : (
            "Marque non renseignée"
          )}
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "2.8rem", lg: "4.8rem" },
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            fontWeight: 300,
            textTransform: "capitalize",
            marginTop: "1.2rem",
          }}
        >
          {titre}
        </Typography>

        <Box sx={{ marginTop: "3.2rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          {designer && <Typography variant="body1">{`Designer : ${designer}`}</Typography>}
          {dimensions && (
            <Typography variant="body1">{`Dimensions : ${dimensions}`}</Typography>
          )}
          {annee != null && <Typography variant="body1">{`Année : ${annee}`}</Typography>}
        </Box>

        {description && (
          <Box
            sx={{
              marginTop: "2.4rem",
              textAlign: "justify",
            }}
          >
            <ReactMarkdown>{description}</ReactMarkdown>
          </Box>
        )}

        <Box sx={{ marginTop: "2.4rem" }}>
          <AppLink
            aria-label={`Demande d’informations - ${titre}`}
            href={`mailto:info@siltec-mobilier.com?subject=${encodeURIComponent(`Demande d’informations - ${titre}`)}`}
            title="Demande d’informations"
            useComponent="a"
          >
            <Button
              disableElevation
              variant="contained"
              sx={{
                width: "100%",
                borderRadius: "3rem",
                py: "1.4rem",
                px: "2rem",
                fontSize: "1.2rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                backgroundColor: resolvedButtonColor,
                color: resolvedButtonTextColor,
                "&:hover": {
                  backgroundColor: resolvedButtonHoverColor,
                  color: resolvedButtonHoverTextColor,
                },
              }}
            >
              Demande d’informations
            </Button>
          </AppLink>
        </Box>
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
                  opacity: idx === activeSlide ? 1 : 0.7,
                  transform: idx === activeSlide ? "scale(1.05)" : "scale(1)",
                  transition: "all .2s ease",
                  minWidth: { xs: "64px", lg: "80px" },
                  width: { xs: "64px", lg: "80px" },
                  height: { xs: "64px", lg: "80px" },
                  flexShrink: 0,
                }}
              >
                <Box
                  component="img"
                  alt={`carroussel-thumbnail-${idx}`}
                  src={src}
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      ) : null}
    </Box>
  );
}
