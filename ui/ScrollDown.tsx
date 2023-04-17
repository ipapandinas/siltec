"use client";

import { UP_LG } from "#/utils/constants";
import SouthIcon from "@mui/icons-material/South";
import { Button } from "@mui/material";
import { keyframes } from "@mui/system";

export default function ScrollDown() {
  const handleClickScroll = () => {
    const element = document.getElementById("firstContainer");
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 160;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const blinker = keyframes`
  50% {
    opacity: 0.4;
  }
`;

  return (
    <Button
      aria-label="Scroll"
      onClick={handleClickScroll}
      sx={{
        display: "none",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        width: "5.6rem",
        height: "5.6rem",
        bottom: { xs: "14rem", lg: "4rem" },
        zIndex: 1000,
        animation: `${blinker} 2s ease infinite`,
        [UP_LG]: {
          display: "flex",
        },
      }}
    >
      <SouthIcon fontSize="large" />
    </Button>
  );
}
