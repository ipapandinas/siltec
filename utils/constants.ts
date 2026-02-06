import { PastilleType } from "#/interfaces/INavigation";
import { removeURLSlash } from "./strings";

export const API_URL = process.env.NEXT_PUBLIC_API_URL
  ? removeURLSlash(process.env.NEXT_PUBLIC_API_URL)
  : "";
export const GRAPHQL_API_URL = process.env.NEXT_PUBLIC_GRAPHQL_API_URL
  ? removeURLSlash(process.env.NEXT_PUBLIC_GRAPHQL_API_URL)
  : "";
// ISR revalidation intervals (seconds)
export const REVALIDATE_STATIC = 60 * 60 * 12; // 12h - navigation, about, contact
export const REVALIDATE_SLOW = 60 * 60 * 2; // 2h  - brands, collections, typologies, projects
export const REVALIDATE_CONTENT = 60 * 60; // 1h - news, products

export const DOWN_XXS = "@media (max-width: 320px)";
export const DOWN_XS = "@media (max-width: 400px)";
export const DOWN_SM = "@media (max-width: 600px)";
export const DOWN_MD = "@media (max-width: 900px)";
export const DOWN_LG = "@media (max-width: 1200px)";
export const DOWN_XL = "@media (max-width: 1536px)";

export const UP_SM = "@media (min-width: 600px)";
export const UP_MD = "@media (min-width: 900px)";
export const UP_LG = "@media (min-width: 1200px)";
export const UP_XL = "@media (min-width: 1536px)";

export const COLOR_PRIMARY_MAIN = "#BFE9E4";
export const COLOR_PRIMARY_LIGHT = "#C9F5F0";
export const COLOR_SECONDARY_MAIN = "#FFA88A";
export const COLOR_SECONDARY_LIGHT = "#FEDFD3";

export const DEFAULT_NAVIGATION: PastilleType[] = [
  {
    couleur: COLOR_PRIMARY_MAIN,
    titre: "Collections",
    url: "/collections",
    picto: {
      data: {
        attributes: {
          alternativeText: "Collections navigation logo",
          url: "/assets/nav/collections.svg",
          hash: "collections",
        },
      },
    },
  },
  {
    couleur: COLOR_SECONDARY_MAIN,
    titre: "Réalisations",
    url: "/projects",
    picto: {
      data: {
        attributes: {
          alternativeText: "Réalisation navigation logo",
          url: "/assets/nav/realisations.svg",
          hash: "realisations",
        },
      },
    },
  },
  {
    couleur: "#FEDB55",
    titre: "Qui sommes-nous",
    url: "/about",
    picto: {
      data: {
        attributes: {
          alternativeText: "About navigation logo",
          url: "/assets/nav/QSN.svg",
          hash: "QSN",
        },
      },
    },
  },
  {
    couleur: COLOR_SECONDARY_LIGHT,
    titre: "Actualités",
    url: "/news",
    picto: {
      data: {
        attributes: {
          alternativeText: "News navigation logo",
          url: "/assets/nav/actu.svg",
          hash: "actu",
        },
      },
    },
  },
  {
    couleur: COLOR_PRIMARY_LIGHT,
    titre: "Contact",
    url: "/contact",
    picto: {
      data: {
        attributes: {
          alternativeText: "Contact navigation logo",
          url: "/assets/nav/contact.svg",
          hash: "contact",
        },
      },
    },
  },
];
