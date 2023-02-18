"use client";

import { Box, Typography } from "@mui/material";

interface IProps {
  color: string;
  text: string;
}

export default function Band({ color, text }: IProps) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "4rem",
        background: color,
        color: "#fff",
        textAlign: "center",
        padding: "0 16rem",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        color="#fff"
        fontWeight="bold"
        textTransform="capitalize"
        variant="h5"
      >
        {text}
      </Typography>
    </Box>
  );
}
