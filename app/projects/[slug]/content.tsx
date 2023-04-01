/* eslint-disable @next/next/no-img-element */
"use client";

import { Box, ImageList, ImageListItem } from "@mui/material";
import ReactMarkdown from "react-markdown";

import { IImage } from "#/interfaces/IImage";

interface Props {
  description?: string | null;
  medias?: {
    data: IImage[] | null;
  };
}

export default function Content({ description, medias }: Props) {
  const mediasList = medias?.data?.map(({ attributes }) => attributes.url);

  return (
    <Box
      sx={{
        img: {
          borderTopLeftRadius: { xs: "2.4rem", lg: "4rem" },
          borderBottomRightRadius: { xs: "2.4rem", lg: "4rem" },
        },
      }}
    >
      {mediasList && (
        <ImageList variant="masonry" cols={2} gap={24}>
          {mediasList.map((url, idx) => (
            <ImageListItem key={idx}>
              <img
                src={`${url}?w=248&fit=crop&auto=format`}
                srcSet={`${url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={`image-${idx}`}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
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
