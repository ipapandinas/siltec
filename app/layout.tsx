"use client";

import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import NorthIcon from "@mui/icons-material/North";
import ScrollToTop from "react-scroll-to-top";
import { Raleway } from "next/font/google";
const raleway = Raleway({ subsets: ["latin"] });

import { theme } from "#/theme";
import createEmotionCache from "#/theme/createEmotionCache";
import Header from "#/ui/Header";
import Footer from "#/ui/Footer";

import "./globals.css";
import styles from "./page.module.css";

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
      <style jsx global>{`
        html {
          font-family: ${raleway.style.fontFamily};
        }
      `}</style>
      <head>
        <title>Siltec - spécialiste de l&apos;ameublement</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta property="og:type" content="website" />
        <meta name="title" property="og:title" content="Siltec" />
        <meta property="og:site_name" content="Siltec" />
        <meta property="og:url" content="http://www.siltec-mobilier.com/" />
        <meta
          name="description"
          property="og:description"
          content="Spécialisé depuis 1977 dans l’aménagement des espaces bureau, résidentiel et hôtellerie."
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <body>
            <Header />
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
          </body>
        </ThemeProvider>
      </CacheProvider>
    </html>
  );
}
