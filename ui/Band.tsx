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
        minHeight: "8rem",
        height: "auto",
        background: color ?? COLOR_PRIMARY_MAIN,
        color: "#fff",
        textAlign: "center",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        color="#fff"
        fontWeight="bold"
        variant="h3"
        textAlign="center"
        textTransform="uppercase"
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
