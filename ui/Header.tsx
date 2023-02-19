"use client";

import { cloneElement, useState } from "react";
import { AppBar, Box, IconButton, Toolbar, useTheme } from "@mui/material";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import InstagramIcon from "@mui/icons-material/Instagram";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import AppLink from "./AppLink";
import NavItem from "./NavItem";
import MobileDrawer from "./MobileDrawer";
import { UP_LG, UP_SM } from "#/utils/constants";
import AppImage from "./AppImage";

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
              maxWidth: "1800px",
              margin: "0 auto",
              width: "100%",
              display: "flex",
              justifyContent: { xs: "flex-end", lg: "center" },
              alignItems: "center",
              padding: { xs: "2.4rem", lg: "4rem 8rem" },
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                left: "8rem",
              }}
            >
              <AppLink href="/" title="Page d'accueil">
                <Box
                  sx={{
                    display: "none",
                    [UP_LG]: { display: "block" },
                  }}
                >
                  <AppImage
                    alt="Siltec logo"
                    src="/siltec.svg"
                    width={180}
                    height={90}
                  />
                </Box>
                <Box
                  sx={{
                    display: "block",
                    [UP_LG]: { display: "none" },
                  }}
                >
                  <AppImage
                    alt="Siltec logo"
                    src="/siltec.svg"
                    width={70}
                    height={35}
                  />
                </Box>
              </AppLink>
            </Box>
            <Box
              sx={{
                display: { xs: "none", lg: "flex" },
                justifyContent: "center",
                alignItems: "center",
                gap: "6.4rem",
              }}
            >
              <NavItem
                color={theme.palette.primary.main}
                href="/collections"
                imageAlt="Collections navigation logo"
                imageHref="/assets/nav/collections.svg"
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
                imageHref="/assets/nav/realisations.svg"
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
                imageHref="/assets/nav/QSN.svg"
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
                imageHref="/assets/nav/actu.svg"
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
                imageHref="/assets/nav/contact.svg"
                imageHeight={80}
                imageWidth={55}
                label="Contact"
                minimize={minimizeNav}
                title="Contact"
              />
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
