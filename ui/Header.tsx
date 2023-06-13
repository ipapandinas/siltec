"use client";

import { cloneElement, useState, useEffect } from "react";
import { AppBar, Box, IconButton, Toolbar, useTheme } from "@mui/material";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import AppLink from "./AppLink";
import NavItem from "./NavItem";
import MobileDrawer from "./MobileDrawer";
import AppImage from "./AppImage";
import { getNavigation } from "#/lib/getNavigation";
import { DEFAULT_NAVIGATION } from "#/utils/constants";

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
  const [isNavLoading, setIsNavLoading] = useState(true);
  const [navigation, setNavigation] = useState(DEFAULT_NAVIGATION);

  const handleMobileOpen = () => {
    setMobileMenuOpen(true);
  };

  const handleMobileClose = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    let shoulUpdate = true;

    const loadNavigation = async () => {
      try {
        const res = await getNavigation();
        if (res && shoulUpdate) {
          setNavigation(res.attributes.pastille);
          setIsNavLoading(false);
        }
      } catch (error) {
        setIsNavLoading(false);
        console.log(error);
      }
    };

    loadNavigation();
    return () => {
      shoulUpdate = false;
    };
  }, []);

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
              padding: { xs: "2.4rem", lg: "2.4rem 8rem" },
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                left: { xs: "2.4rem", lg: "8rem" },
              }}
            >
              <AppLink href="/" title="Page d'accueil">
                <AppImage
                  alt="Siltec logo"
                  src="/siltec.svg"
                  width={130}
                  height={60}
                />
              </AppLink>
            </Box>
            {
              <Box
                sx={{
                  display: { xs: "none", lg: "flex" },
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "6.4rem",
                  opacity: isNavLoading ? 0 : 1,
                  transition: "opacity 0.5s ease 0.5s",
                }}
              >
                {navigation.map(({ couleur, url, picto, titre }, idx) => (
                  <NavItem
                    key={idx}
                    color={couleur}
                    href={url}
                    imageAlt={`${titre} - Navigation Logo`}
                    imageHref={
                      picto.data?.attributes.url ??
                      DEFAULT_NAVIGATION[idx].picto.data.attributes.url
                    }
                    imageHeight={50}
                    imageWidth={30}
                    label={titre}
                    minimize={minimizeNav}
                    title={titre}
                  />
                ))}
              </Box>
            }
            <Box
              sx={{
                display: { xs: "block", lg: "none" },
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
                      path: { fill: "#093f4d" },
                    }}
                  />
                ) : (
                  <CloseIcon
                    fontSize="large"
                    sx={{
                      path: { fill: "#093f4d" },
                    }}
                  />
                )}
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <MobileDrawer
        navigation={navigation}
        open={mobileMenuOpen}
        onClose={handleMobileClose}
      />
    </Box>
  );
}
