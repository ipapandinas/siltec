"use client";

import { Box, Container } from "@mui/material";
import ReactMarkdown from "react-markdown";

import { IImage } from "#/interfaces/IImage";
import Carroussel from "#/ui/Carroussel";

interface Props {
  description?: string | null;
  medias?: {
    data: IImage[] | null;
  };
}

export default function Content({ description, medias }: Props) {
  const carrousselList = medias?.data?.map(({ attributes }) => attributes.url);

  return (
    <>
      {description && (
        <Box
          sx={{
            width: "850px",
            margin: "0 auto",
            h1: {
              marginBottom: "1.6rem",
            },
            h2: {
              marginBottom: "1.6rem",
            },
            p: { textAlign: "justify", textJustify: "inter-word" },
          }}
        >
          <ReactMarkdown>{description}</ReactMarkdown>
        </Box>
      )}
      {carrousselList && (
        <Container sx={{ marginTop: "12rem" }}>
          <Carroussel list={carrousselList} />
        </Container>
      )}
    </>
  );
}
