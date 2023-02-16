"use client";

import { Box, BoxProps as MuiBoxProps } from "@mui/material";

interface Props extends MuiBoxProps {
  bgcolor?: string;
  bgcolorSize?: "sm" | "md" | "lg";
  children: any;
}

export default function Container(props: Props) {
  const { bgcolor, bgcolorSize, children } = props;
  const propsCopy = { ...props };
  return (
    <Box
      id="container"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        maxWidth: "100%",
        height: "100%",
        bgcolor: bgcolorSize
          ? { xs: bgcolor, [bgcolorSize]: "transparent" }
          : bgcolor,
      }}
    >
      <Box
        sx={{
          maxWidth: { xs: "100%", xl: "1600px" },
          width: "100%",
          padding: { xs: "4.8rem 1.2rem", lg: "8rem 4rem" },
          ...propsCopy.sx,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
