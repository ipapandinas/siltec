"use client";

import { Box, BoxProps as MuiBoxProps } from "@mui/material";

interface Props extends MuiBoxProps {
  bgcolor?: string;
  bgcolorSize?: "sm" | "md" | "lg";
  children: any;
  id?: string;
}

export default function Container(props: Props) {
  const { bgcolor, bgcolorSize, children, id } = props;
  const propsCopy = { ...props };
  return (
    <Box
      id={id ?? "container"}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        maxWidth: "100%",
        height: "100%",
        bgcolor: bgcolorSize
          ? { xs: bgcolor, [bgcolorSize]: "transparent" }
          : bgcolor,
      }}
    >
      <Box
        sx={{
          maxWidth: { xs: "100%", lg: "1326px" },
          width: { xs: "100%", lg: "1326px" },
          padding: { xs: "4.8rem 1.2rem", lg: "8rem 4rem" },
          ...propsCopy.sx,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
