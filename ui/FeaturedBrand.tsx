"use client";

import { Box, Button, Typography, useTheme } from "@mui/material";

import AppImage from "./AppImage";
import AppLink from "./AppLink";
import RoundWrapper from "./RoundWrapper";

interface IProps {
  bgcolor: string;
  href: string;
  logoSrc: string;
  name: string;
}

export default function FeaturedBrand({
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
        <AppImage
          alt={`${name} logo`}
          src={logoSrc}
          width={280}
          height={100}
          loadMode="md"
        />
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
          53 rue de Miromesnil, 75008 PARIS
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
