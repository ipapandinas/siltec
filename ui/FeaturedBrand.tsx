"use client";

import { Box, Button, Typography, useTheme } from "@mui/material";

import AppImage from "./AppImage";
import AppLink from "./AppLink";
import RoundWrapper from "./RoundWrapper";

interface IProps {
  address: string;
  bgcolor: string;
  href: string;
  logoSrc: string;
  name: string;
}

export default function FeaturedBrand({
  address,
  bgcolor,
  href,
  logoSrc,
  name,
}: IProps) {
  const theme = useTheme();
  return (
    <RoundWrapper
      bgcolor={bgcolor}
      sx={{
        gap: "3.2rem",
      }}
    >
      <Box sx={{ marginLeft: { xs: "0", lg: "2.4rem" } }}>
        <AppLink
          aria-label={`${name} website`}
          href={href}
          target="_blank"
          rel="noreferrer"
          title={`${name} website`}
        >
          <AppImage
            alt={`${name} logo`}
            src={logoSrc}
            width={300}
            height={120}
            loadMode="md"
          />
        </AppLink>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: theme.palette.background.default,
          padding: { xs: "2.4rem 4rem", lg: "2.4rem 8rem" },
          borderRadius: "12rem",
          marginLeft: { xs: 0, lg: "12rem" },
        }}
      >
        <Typography
          fontWeight="bold"
          textAlign="center"
          textTransform="uppercase"
          variant="body1"
        >
          SHOWROOM
        </Typography>
        <Typography textAlign="center" variant="body1">
          {address}
        </Typography>
        <Typography textAlign="center" variant="body1">
          +33 1 42 66 09 13
        </Typography>
        <a
          href="mailto:info@siltec-mobilier.com"
          target="_blank"
          rel="noreferrer"
        >
          <Typography
            textAlign="center"
            variant="body1"
            sx={{ textDecoration: "underline" }}
          >
            info@siltec-mobilier.com
          </Typography>
        </a>
      </Box>
      <AppLink
        aria-label={`${name} website`}
        href={href}
        target="_blank"
        rel="noreferrer"
        title={`${name} website`}
      >
        <Button
          disableElevation
          size="large"
          variant="contained"
          sx={{
            position: { xs: "relative", lg: "absolute" },
            right: 0,
            bottom: { xs: "auto", lg: "-1.6rem" },
            backgroundColor: theme.palette.primary.light,
            color: "#010101",
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
              color: "#fff",
            },
          }}
        >
          {`le site ${name}`}
        </Button>
      </AppLink>
    </RoundWrapper>
  );
}
