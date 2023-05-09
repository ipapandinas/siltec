"use client";

import { Box } from "@mui/material";
import ReactMarkdown from "react-markdown";

import { IImage } from "#/interfaces/IImage";
import AppImage from "#/ui/AppImage";
import { rgbDataURL } from "#/utils/strings";

interface Props {
  description: string;
  trombinoscope: {
    data: IImage | null;
  };
}

export default function Content({ description, trombinoscope }: Props) {
  const { alternativeText, url } = trombinoscope.data?.attributes ?? {};

  return (
    <>
      <Box
        sx={{
          width: { xs: "100%", lg: "850px" },
          margin: "0 auto",
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
      {url && (
        <Box
          marginTop="12rem"
          sx={{
            display: "flex",
            justifyContent: "center",
            position: "relative",
            img: { width: { xs: "100%", lg: "80%" }, height: "auto" },
          }}
        >
          <AppImage
            alt={alternativeText ?? "trombinoscope"}
            src={url}
            width={600}
            height={400}
            placeholder="blur"
            blurDataURL={rgbDataURL(255, 216, 209)}
            quality={100}
          />
        </Box>
      )}
    </>
  );
}
