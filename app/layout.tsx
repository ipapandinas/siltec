"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";

import { theme } from "#/theme";
import Header from "#/ui/Header";
import Footer from "#/ui/Footer";

import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <body>
          <Header />
          {children}
          <Footer />
        </body>
      </ThemeProvider>
    </html>
  );
}
