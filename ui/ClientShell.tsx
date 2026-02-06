"use client";

import type { ReactNode } from "react";
import type { PastilleType } from "#/interfaces/INavigation";
import NorthIcon from "@mui/icons-material/North";
import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import ScrollToTop from "react-scroll-to-top";

import { theme } from "#/theme";
import createEmotionCache from "#/theme/createEmotionCache";
import Footer from "#/ui/Footer";
import Header from "#/ui/Header";
import styles from "#/app/page.module.css";

const clientSideEmotionCache = createEmotionCache();

export default function ClientShell({
  children,
  navigation,
}: {
  children: ReactNode;
  navigation: PastilleType[];
}) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header navigation={navigation} />
        <main className={styles.main}>{children}</main>
        <Footer />
        <ScrollToTop
          smooth
          top={400}
          component={<NorthIcon color="secondary" fontSize="large" />}
          viewBox="0 0 0 0"
          style={{
            boxShadow: "none",
            background: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            right: "1.6rem",
            bottom: "1.6rem",
            width: "5.6rem",
            height: "5.6rem",
          }}
        />
      </ThemeProvider>
    </CacheProvider>
  );
}