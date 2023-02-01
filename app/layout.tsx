"use client";

import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import NorthIcon from "@mui/icons-material/North";
import ScrollToTop from "react-scroll-to-top";

import { theme } from "#/theme";
import createEmotionCache from "#/theme/createEmotionCache";
import Header from "#/ui/Header";
import Footer from "#/ui/Footer";

import "./globals.css";

const clientSideEmotionCache = createEmotionCache();

export default function RootLayout({
  children,
  emotionCache = clientSideEmotionCache,
}: {
  children: React.ReactNode;
  emotionCache?: EmotionCache;
}) {
  return (
    <html lang="en">
      <head />
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <body>
            <Header />
            {children}
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
          </body>
        </ThemeProvider>
      </CacheProvider>
    </html>
  );
}
