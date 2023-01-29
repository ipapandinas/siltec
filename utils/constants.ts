import { removeURLSlash } from "./strings";

export const API_URL = process.env.NEXT_PUBLIC_API_URL
  ? removeURLSlash(process.env.NEXT_PUBLIC_API_URL)
  : "";
export const GRAPHQL_API_URL = process.env.NEXT_PUBLIC_GRAPHQL_API_URL
  ? removeURLSlash(process.env.NEXT_PUBLIC_GRAPHQL_API_URL)
  : "";

export const UP_SM = "@media (min-width: 600px)";
export const UP_MD = "@media (min-width: 900px)";
export const UP_LG = "@media (min-width: 1200px)";
export const UP_XL = "@media (min-width: 1536px)";

export const COLOR_PRIMARY_MAIN = "#BFE9E4";
export const COLOR_PRIMARY_LIGHT = "#C9F5F0";
export const COLOR_SECONDARY_MAIN = "#FFA88A";
export const COLOR_SECONDARY_LIGHT = "#FEDFD3";
