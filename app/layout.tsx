import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Raleway } from "next/font/google";
import { getNavigation } from "#/lib/getNavigation";
import { DEFAULT_NAVIGATION } from "#/utils/constants";
import type { PastilleType } from "#/interfaces/INavigation";

import ClientShell from "#/ui/ClientShell";

import "./globals.css";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Siltec - spécialiste de l'ameublement",
  description:
    "Spécialisé depuis 1977 dans l'aménagement des espaces bureau, résidentiel et hôtellerie.",
  openGraph: {
    type: "website",
    title: "Siltec",
    siteName: "Siltec",
    url: "http://www.siltec-mobilier.com/",
    description:
      "Spécialisé depuis 1977 dans l'aménagement des espaces bureau, résidentiel et hôtellerie.",
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      "/favicon.ico",
    ],
    apple: "/apple-touch-icon.png",
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#5bbad5" }],
  },
  manifest: "/site.webmanifest",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const navData = await getNavigation();
  const navigation: PastilleType[] = navData ?? DEFAULT_NAVIGATION;

  return (
    <html lang="en" className={raleway.className}>
      <body>
        <ClientShell navigation={navigation}>{children}</ClientShell>
      </body>
    </html>
  );
}
