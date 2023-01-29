"use client";

import { Box, useTheme } from "@mui/material";

export default function Footer() {
  const theme = useTheme();
  return (
    <Box
      component="footer"
      sx={{
        background: theme.palette.background.default,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "4rem 8rem",
      }}
    >
      Footer
    </Box>
  );
}
