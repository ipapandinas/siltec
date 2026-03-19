"use client";
import { useState } from "react";

import { IImage } from "#/interfaces/IImage";
import { cloudinaryThumbUrl, injectCloudinaryTransforms, isCloudinaryUrl } from "#/utils/cloudinary";
import { resolveCardImageUrl } from "#/utils/media";

import {
  Box,
  Card as MuiCard,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import Link from "next/link";

import AppImage from "./AppImage";

interface IProps {
  href: string;
  image?: IImage | null;
  imageAlt: string;
  imageSrc?: string;
  label: string;
  title: string;
  cornerVariant?: "default" | "reverse";
}

export default function Card({
  href,
  image = null,
  imageAlt,
  imageSrc,
  label,
  title,
  cornerVariant = "default",
}: IProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const resolvedImageUrl = resolveCardImageUrl(image);
  const legacyCloudinaryUrl = imageSrc
    ? isCloudinaryUrl(imageSrc)
      ? injectCloudinaryTransforms(
          imageSrc,
          "f_auto,q_auto:eco,c_fill,g_auto,w_370,h_380"
        )
      : cloudinaryThumbUrl(imageSrc, { width: 370, height: 380 })
    : null;
  const displayImageUrl = resolvedImageUrl ?? legacyCloudinaryUrl;

  if (!displayImageUrl) {
    return null;
  }

  const cardRadiusSx =
    cornerVariant === "reverse"
      ? {
          borderTopRightRadius: { xs: "6rem", lg: "8rem" },
          borderBottomLeftRadius: { xs: "6rem", lg: "8rem" },
        }
      : {
          borderTopLeftRadius: { xs: "6rem", lg: "8rem" },
          borderBottomRightRadius: { xs: "6rem", lg: "8rem" },
        };

  return (
    <MuiCard sx={{ width: "100%", ...cardRadiusSx }} elevation={0}>
      <Link href={href} title={title}>
        <CardActionArea
          sx={{
            "& img": {
              transition: "transform 0.4s ease",
            },
            ":hover": {
              "& img": {
                transform: "scale(1.2)",
              },
            },
          }}
        >
          <Box
            className="MuiCardMedia-root"
            sx={{
              position: "relative",
              height: 380,
              bgcolor: "rgba(0,0,0,0.06)",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                zIndex: 1,
                pointerEvents: "none",
                opacity: isImageLoaded ? 0 : 1,
                transition: "opacity .25s ease",
                background:
                  "linear-gradient(110deg, rgba(0,0,0,0.06) 20%, rgba(255,255,255,0.45) 35%, rgba(0,0,0,0.06) 50%)",
                backgroundSize: "220% 100%",
                animation: "siltecCardShimmer 1.2s linear infinite",
                "@keyframes siltecCardShimmer": {
                  "0%": { backgroundPosition: "220% 0" },
                  "100%": { backgroundPosition: "-220% 0" },
                },
              }}
            />
            <AppImage
              alt={imageAlt}
              src={displayImageUrl}
              fill
              sizes="(max-width: 600px) 100vw, 370px"
              style={{ objectFit: "cover" }}
              onLoad={() => setIsImageLoaded(true)}
            />
          </Box>
          <CardContent
            sx={{
              position: "relative",
              zIndex: 1000,
              background: "#fff",
              paddingX: "1.6rem !important",
            }}
          >
            <Typography
              textAlign="center"
              variant="body1"
              component="div"
              sx={{
                whiteSpace: { xs: "unset", sm: "nowrap" },
                overflow: "hidden",
                textOverflow: "ellipsis",
                ":first-letter": {
                  textTransform: "capitalize",
                },
              }}
            >
              {label}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </MuiCard>
  );
}
