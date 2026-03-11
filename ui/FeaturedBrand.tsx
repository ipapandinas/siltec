"use client";

import { Box, Button, Typography, useTheme } from "@mui/material";
import { darken } from "@mui/material/styles";

import AppImage from "./AppImage";
import AppLink from "./AppLink";
import RoundWrapper from "./RoundWrapper";

interface IProps {
  address: string;
  bgcolor: string;
  buttonColor?: string;
  href: string;
  logoSrc: string;
  name: string;
  textColor?: string;
}

export default function FeaturedBrand({
  address,
  bgcolor,
  buttonColor,
  href,
  logoSrc,
  name,
  textColor,
}: IProps) {
  const theme = useTheme();
  const resolvedButtonColor = buttonColor || "#A2B39B";
  const resolvedButtonHoverColor = buttonColor
    ? darken(resolvedButtonColor, 0.2)
    : "#717e6c";
  const resolvedButtonTextColor = theme.palette.getContrastText(resolvedButtonColor);
  const resolvedButtonHoverTextColor = theme.palette.getContrastText(
    resolvedButtonHoverColor
  );

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
            loadMode="lg"
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
          color: textColor || "#010101",
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
            backgroundColor: resolvedButtonColor,
            color: resolvedButtonTextColor,
            "&:hover": {
              backgroundColor: resolvedButtonHoverColor,
              color: resolvedButtonHoverTextColor,
            },
          }}
        >
          {`le site ${name}`}
        </Button>
      </AppLink>
    </RoundWrapper>
  );
}
