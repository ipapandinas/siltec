"use client";

import { Box, Chip } from "@mui/material";

export default function SiltecChip() {
  return (
    <Box sx={{ position: "absolute", zIndex: 1000 }}>
      <Chip
        label="Spécialisé depuis 1977 dans l’aménagement des espaces bureau, résidentiel et hôtellerie."
        sx={{ backgroundColor: "#fff" }}
      />
    </Box>
  );
}
