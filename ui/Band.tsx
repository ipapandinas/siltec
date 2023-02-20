"use client";

import { COLOR_PRIMARY_MAIN } from "#/utils/constants";
import { Box, Typography } from "@mui/material";

interface IProps {
  color?: string | null;
  text: string;
}

export default function Band({ color, text }: IProps) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "4rem",
        background: color ?? COLOR_PRIMARY_MAIN,
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
        variant="h5"
        sx={{
          ":first-letter": {
            textTransform: "capitalize",
          },
        }}
      >
        {text}
      </Typography>
    </Box>
  );
}
