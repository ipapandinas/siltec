"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  color: string;
  description: string;
  imageAlt: string;
  imageHref: string;
  isRtl?: boolean;
  linkHref: string;
  linkTitle: string;
  title: string;
}

export default function CollectionBlock({
  color,
  description,
  imageAlt,
  imageHref,
  isRtl = false,
  linkHref,
  linkTitle,
  title,
}: IProps) {
  return (
    <Link href={linkHref} title={linkTitle}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: isRtl ? "row-reverse" : "row",
        }}
      >
        <img alt={imageAlt} src={imageHref} width={800} height={800} />
        <Box
          sx={{
            width: 800,
            height: 800,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: color,
            position: "relative",
            borderTopLeftRadius: isRtl ? "50%" : 0,
            borderBottomLeftRadius: isRtl ? "50%" : 0,
            borderTopRightRadius: isRtl ? 0 : "50%",
            borderBottomRightRadius: isRtl ? 0 : "50%",
            padding: "0 8rem",
          }}
        >
          <Typography textTransform="uppercase" variant="h3">
            {title}
          </Typography>
          <Typography
            maxWidth="40rem"
            mt="2.4rem"
            textAlign="center"
            variant="body1"
          >
            {description}
          </Typography>
        </Box>
      </Box>
    </Link>
  );
}
