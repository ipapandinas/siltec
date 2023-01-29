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
    <MuiCard sx={{ maxWidth: 400 }}>
      <Link href={href} title={title}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="240"
            image={imageSrc}
            alt={imageAlt}
          />
          <CardContent>
            <Typography
              fontWeight="bold"
              textAlign="center"
              textTransform="capitalize"
              variant="h5"
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
