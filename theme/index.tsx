import { createTheme } from "@mui/material";

import {
  COLOR_PRIMARY_LIGHT,
  COLOR_PRIMARY_MAIN,
  COLOR_SECONDARY_LIGHT,
  COLOR_SECONDARY_MAIN,
} from "#/utils/constants";

export const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        main: {
          backgroundColor: "#f6f6f6",
          backgroundImage: `linear-gradient(#F9F4F2, #DEF2F0)`,
        },
      },
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: COLOR_PRIMARY_MAIN,
      light: COLOR_PRIMARY_LIGHT,
      dark: "#376382",
    },
    secondary: {
      main: COLOR_SECONDARY_MAIN,
      light: COLOR_SECONDARY_LIGHT,
    },
    warning: {
      main: "#FEDB55",
      light: "#FBE9A6",
    },
    error: {
      main: "#D90111",
    },
    background: {
      default: "#f6f6f6",
    },
  },
  typography: {
    htmlFontSize: 10,
    allVariants: {
      color: "#010101",
    },
  },
});
