"use client";

import { Box } from "@mui/material";
import ReactMarkdown from "react-markdown";

import { IImage } from "#/interfaces/IImage";
import { DOWN_LG, UP_LG } from "#/utils/constants";
import AppImage from "#/ui/AppImage";
import { rgbDataURL } from "#/utils/strings";

interface Props {
  titre: string;
  description?: string | null;
  medias?: {
    data: IImage[] | null;
  };
}

export default function Content({ titre, description, medias }: Props) {
  const mediasList = medias?.data?.map(({ attributes }) => attributes.url);

  return (
    <Box>
      {mediasList && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "4.8rem",
            width: "85% !important",
            margin: "8rem auto 0",
            [UP_LG]: {
              width: "850px !important",
            },

            img: {
              borderTopLeftRadius: { xs: "4rem", lg: "8rem" },
              borderBottomRightRadius: { xs: "4rem", lg: "8rem" },
              overflow: "hidden",
              maxHeight: 850,
              width: "auto",
              maxWidth: "100%",
              [DOWN_LG]: {
                height: "auto",
              },
            },
          }}
        >
          {mediasList.map((url, idx) => (
            <AppImage
              key={idx}
              alt={`image-${idx}`}
              src={url}
              width={850}
              height={600}
              quality={100}
              placeholder="blur"
              blurDataURL={rgbDataURL(233, 243, 240)}
            />
          ))}
        </Box>
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
