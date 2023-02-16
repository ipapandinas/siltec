"use client";

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
  return (
    <MuiCard sx={{ width: "100%" }} elevation={0}>
      <Link href={href} title={title}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="380"
            image={imageSrc}
            alt={imageAlt}
            sx={{ objectFit: "cover" }}
          />
          <CardContent>
            <Typography
              textAlign="center"
              textTransform="capitalize"
              variant="body1"
              component="div"
            >
              {label}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </MuiCard>
  );
}
