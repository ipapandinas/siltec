"use client";

import { Box, Typography } from "@mui/material";
import Band from "./Band";

interface IProps {
  color: string;
  subtitle: string;
  title: string;
}

export default function SinglePageHeader({ color, subtitle, title }: IProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        margin: "0 auto",
      }}
    >
      <Band color={color} text={title} />
      <Typography variant="body1" mt="3.2rem">
        {subtitle}
      </Typography>
    </Box>
  );
}
