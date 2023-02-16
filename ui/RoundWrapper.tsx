"use client";

import { Box, BoxProps as MuiBoxProps } from "@mui/material";

interface Props extends MuiBoxProps {
  bgcolor?: string;
  children: React.ReactNode;
}

export default function RoundWrapper(props: Props) {
  const { bgcolor, children } = props;
  const propsCopy = { ...props };
  return (
    <Box
      sx={{
        bgcolor,
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        justifyContent: "center",
        alignItems: "center",
        padding: { xs: "1.6rem", lg: "4rem 6.4rem" },
        position: "relative",
        borderRadius: { xs: "4rem", lg: "12rem" },
        width: "100%",
        ...propsCopy.sx,
      }}
    >
      {children}
    </Box>
  );
}
