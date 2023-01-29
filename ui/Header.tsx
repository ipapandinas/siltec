"use client";

import Image from "next/image";
import Link from "next/link";
import { Box, useTheme } from "@mui/material";

import NavItem from "./NavItem";

export default function Header() {
  const theme = useTheme();
  return (
    <Box
      component="header"
      sx={{
        background: theme.palette.background.default,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "4rem 8rem",
      }}
    >
      <Link href="/" title="homepage">
        <Image alt="Siltec logo" src="/siltec.png" width={180} height={90} />
      </Link>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8rem",
        }}
      >
        <NavItem
          color={theme.palette.primary.main}
          href="/collections"
          imageAlt="Collections navigation logo"
          imageHref="/assets/nav/chaise.png"
          imageHeight={80}
          imageWidth={40}
          label="Collections"
          title="Collections"
        />
        <NavItem
          color={theme.palette.secondary.main}
          href="/projects"
          imageAlt="Réalisations navigation logo"
          imageHref="/assets/nav/table.png"
          imageHeight={75}
          imageWidth={75}
          label="Réalisations"
          title="Réalisations"
        />
        <NavItem
          color={theme.palette.warning.main}
          href="/about"
          imageAlt="Info navigation logo"
          imageHref="/assets/nav/C.png"
          imageHeight={80}
          imageWidth={63}
          label="Qui sommes-nous?"
          title="Qui sommes-nous?"
        />
        <NavItem
          color={theme.palette.secondary.light}
          href="/news"
          imageAlt="Actualités navigation logo"
          imageHref="/assets/nav/fauteuil.png"
          imageHeight={80}
          imageWidth={73}
          label="Actualités"
          title="Actualités"
        />
        <NavItem
          color={theme.palette.primary.light}
          href="/contact"
          imageAlt="Contact navigation logo"
          imageHref="/assets/nav/lampe.png"
          imageHeight={80}
          imageWidth={55}
          label="Contact"
          title="Contact"
        />
      </Box>
      <Box>Instagram</Box>
    </Box>
  );
}
