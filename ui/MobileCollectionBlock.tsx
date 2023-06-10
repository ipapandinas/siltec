"use client";

import { UP_LG } from "#/utils/constants";
import { Box, Typography } from "@mui/material";

import AppImage from "./AppImage";
import AppLink from "./AppLink";

interface IProps {
  color: string;
  imageAlt: string;
  imageHref: string;
  isRtl?: boolean;
  linkHref: string;
  linkTitle: string;
  title: string;
}

export default function MobileCollectionBlock({
  color,
  imageAlt,
  imageHref,
  isRtl = false,
  linkHref,
  linkTitle,
  title,
}: IProps) {
  return (
    <Box>
      <AppLink href={linkHref} title={linkTitle}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: isRtl ? "row-reverse" : "row",
            width: "100%",
            height: "auto",
            position: "relative",
          }}
        >
          <AppImage
            alt={imageAlt}
            src={imageHref}
            width={400}
            height={400}
            style={{ objectFit: "cover" }}
          />
          <Box
            sx={{
              width: 264,
              height: 264,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: `${color}bb`,
              position: "absolute",
              borderRadius: "50%",
              padding: "0 1.6rem",
            }}
          >
            <Typography
              textTransform="uppercase"
              variant="h3"
              textAlign="center"
            >
              {title}
            </Typography>
          </Box>
        </Box>
      </AppLink>
    </Box>
  );
}
