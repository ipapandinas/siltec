"use client";

import { Box, Typography } from "@mui/material";

import { UP_LG } from "#/utils/constants";

import AppImage from "./AppImage";
import AppLink from "./AppLink";

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
    <Box
      sx={{
        display: "none",
        [UP_LG]: {
          display: "block",
          alignSelf: isRtl ? "flex-end" : "flex-start",
          width: "100%",
        },
      }}
    >
      <AppLink href={linkHref} title={linkTitle}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: isRtl ? "row-reverse" : "row",
            img: {
              width: "50% !important",
            },
          }}
        >
          <AppImage
            alt={imageAlt}
            src={imageHref}
            width={600}
            height={620}
            style={{ objectFit: "cover" }}
          />
          <Box
            sx={{
              width: "50%",
              height: 620,
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
      </AppLink>
    </Box>
  );
}
