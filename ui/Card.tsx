"use client";
import cloudinary from "utils/cloudinary";
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
  imageAlt: string;
  imageSrc: string;
  label: string;
  title: string;
}

export default function Card({
  href,
  imageAlt,
  imageSrc,
  label,
  title,
}: IProps) {
  const srcCloudinary = cloudinary
    .image(imageSrc)
    .resize(thumbnail().width(370).height(380))
    .toURL();

  return (
    <MuiCard sx={{ width: "100%" }} elevation={0}>
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
            image={srcCloudinary}
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
