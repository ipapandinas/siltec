"use client";

import Image from "next/image";
import { Box, Button, Typography, useTheme } from "@mui/material";
import Link from "next/link";

export default function Arflex() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        background: theme.palette.secondary.light,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "4rem 6.4rem 4rem 12rem",
        position: "relative",
        borderRadius: "12rem",
      }}
    >
      <Image
        alt="Arflex logo"
        src="/assets/brands/arflex.png"
        width={230}
        height={70}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: theme.palette.background.default,
          padding: "2.4rem 8rem",
          borderRadius: "8rem",
          marginLeft: "32rem",
        }}
      >
        <Typography fontWeight="bold" textTransform="uppercase" variant="body1">
          SHOWROOM
        </Typography>
        <Typography variant="body1">
          53 rue de Miromesnil, 75008 PARIS
        </Typography>
        <Typography variant="body1">01 42 66 09 13</Typography>
        <a
          href="mailto:info@siltec-mobilier.com"
          target="_blank"
          rel="noreferrer"
        >
          <Typography variant="body1" sx={{ textDecoration: "underline" }}>
            info@siltec-mobilier.com
          </Typography>
        </a>
      </Box>
      <Link
        aria-label="Arflex website"
        href="https://www.arflex.it/"
        target="_blank"
        rel="noreferrer"
        title="Arflex website"
      >
        <Button
          disableElevation
          size="large"
          variant="contained"
          sx={{
            borderRadius: "8rem",
            position: "absolute",
            right: 0,
            bottom: "-1.6rem",
            backgroundColor: theme.palette.primary.light,
            color: "#010101",
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
              color: "#fff",
            },
          }}
        >
          le site d&apos;Arflex
        </Button>
      </Link>
    </Box>
  );
}
