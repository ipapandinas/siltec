"use client";

import { UP_SM } from "#/utils/constants";
import { Box, Chip } from "@mui/material";

export default function SiltecChip() {
  return (
    <Box
      sx={{
        display: "none",
        [UP_SM]: {
          display: "block",
          position: "absolute",
          zIndex: 1000,
        },
      }}
    >
      <Chip
        label="Spécialisé depuis 1977 dans l’aménagement des espaces bureau, résidentiel et hôtellerie."
        sx={{ backgroundColor: "#fff", textAlign: "center" }}
      />
    </Box>
  );
}
