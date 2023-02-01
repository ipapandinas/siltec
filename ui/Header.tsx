"use client";

import { cloneElement, useState } from "react";
import Image from "next/image";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import InstagramIcon from "@mui/icons-material/Instagram";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import AppLink from "./AppLink";
import NavItem from "./NavItem";
import MobileDrawer from "./MobileDrawer";

function ElevationScroll(props: { children: any; mobileMenuOpen: boolean }) {
  const { children, mobileMenuOpen } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return cloneElement(children, {
    elevation: trigger && !mobileMenuOpen ? 4 : 0,
  });
}

export default function Header() {
  const theme = useTheme();
  const minimizeNav = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileOpen = () => {
    setMobileMenuOpen(true);
  };

  const handleMobileClose = () => {
    setMobileMenuOpen(false);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <ElevationScroll mobileMenuOpen={mobileMenuOpen}>
        <AppBar
          component="header"
          position="fixed"
          color="transparent"
          sx={{
            backgroundColor: theme.palette.common.white,
          }}
        >
          <Toolbar
            sx={{
              maxWidth: "1600px",
              margin: "0 auto",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: { xs: "2.4rem", lg: "4rem" },
            }}
          >
            <AppLink href="/" title="Page d'accueil">
              <Image
                alt="Siltec logo"
                src="/siltec.png"
                width={isSmallScreen ? 90 : 180}
                height={isSmallScreen ? 45 : 90}
              />
            </AppLink>
            <Box
              sx={{
                display: { xs: "none", lg: "flex" },
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
                minimize={minimizeNav}
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
                minimize={minimizeNav}
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
                minimize={minimizeNav}
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
                minimize={minimizeNav}
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
                minimize={minimizeNav}
                title="Contact"
              />
            </Box>
            <Box
              sx={{
                display: { xs: "none", lg: "block", paddingRight: "12px" },
              }}
            >
              <AppLink
                href="https://www.instagram.com/siltecmobilier"
                title="Instagram Siltec"
              >
                <InstagramIcon
                  fontSize="large"
                  sx={{
                    path: { fill: "#010101" },
                  }}
                />
              </AppLink>
            </Box>
            <Box
              sx={{
                display: { xs: "block", lg: "none", paddingRight: "12px" },
              }}
            >
              <IconButton
                aria-label="Menu"
                component="label"
                onClick={!mobileMenuOpen ? handleMobileOpen : handleMobileClose}
                disableRipple
                size="medium"
                edge="start"
                sx={{
                  paddingX: 0,
                }}
              >
                {!mobileMenuOpen ? (
                  <MenuIcon
                    fontSize="large"
                    sx={{
                      path: { fill: "#010101" },
                    }}
                  />
                ) : (
                  <CloseIcon
                    fontSize="large"
                    sx={{
                      path: { fill: "#010101" },
                    }}
                  />
                )}
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <MobileDrawer open={mobileMenuOpen} onClose={handleMobileClose} />
    </Box>
  );
}
