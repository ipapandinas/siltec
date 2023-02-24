"use client";

import { Box, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";

import { IImage } from "#/interfaces/IImage";
import Carroussel from "#/ui/Carroussel";
import Container from "#/ui/Container";
import { UP_LG } from "#/utils/constants";

interface Props {
  titre: string;
  description?: string | null;
  medias?: {
    data: IImage[] | null;
  };
}

export default function Content({ titre, description, medias }: Props) {
  const carrousselList = medias?.data?.map(({ attributes }) => attributes.url);

  return (
    <Box>
      {carrousselList && (
        <Box
          sx={{
            ".slick-slider": {
              width: "100% !important",
              height: "auto",
              maxHeight: "1000px",
              objectFit: "cover",
              margin: "0 auto",
              [UP_LG]: {
                width: "66% !important",
              },
            },

            ".slick-slide img": {
              height: "400px",
            },
          }}
        >
          <Carroussel list={carrousselList} />
        </Box>
      )}
      {titre && (
        <Typography variant="h4" textAlign="center" sx={{ marginTop: "8rem" }}>
          {titre}
        </Typography>
      )}
      {description && (
        <Box
          sx={{
            width: { xs: "100%", lg: "850px" },
            margin: "4rem auto 0",
            h1: {
              marginBottom: "1.6rem",
              textAlign: { xs: "center", lg: "justify" },
            },
            h2: {
              marginBottom: "1.6rem",
              textAlign: { xs: "center", lg: "justify" },
            },
            p: { textAlign: "justify", textJustify: "inter-word" },
          }}
        >
          <ReactMarkdown>{description}</ReactMarkdown>
        </Box>
      )}
    </Box>
  );
}
