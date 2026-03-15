"use client";
import { IImage } from "#/interfaces/IImage";
import cloudinary from "#/utils/cloudinary";
import { resolveImageUrl } from "#/utils/media";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";

import {
  Card as MuiCard,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import Link from "next/link";

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
  const resolvedImageUrl = resolveImageUrl(image);
  const legacyCloudinaryUrl = imageSrc
    ? cloudinary
        .image(imageSrc)
        .resize(thumbnail().width(370).height(380))
        .toURL()
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
          <CardMedia
            component="img"
            height="380"
            image={displayImageUrl}
            alt={imageAlt}
            sx={{ objectFit: "cover" }}
          />
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
