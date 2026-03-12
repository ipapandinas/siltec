/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Box,
  ImageList,
  ImageListItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ReactMarkdown from "react-markdown";

import { IImage } from "#/interfaces/IImage";

interface Props {
  date?: string | null;
  description?: string | null;
  medias?: IImage[] | null;
}

const formatDate = (value?: string | null) => {
  if (!value) return null;

  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) return null;

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(Date.UTC(year, month - 1, day)));
};

export default function Content({ date, description, medias }: Props) {
  const theme = useTheme();
  const isResponsive = useMediaQuery(theme.breakpoints.down("md"));
  const nbColumns = isResponsive ? 1 : 2;
  const mediasList = medias?.map(({ url }) => url);
  const formattedDate = formatDate(date);

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
        <ImageList variant="masonry" cols={nbColumns} gap={24}>
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
      {formattedDate && (
        <Typography variant="h5" textAlign="center" sx={{ marginBottom: "4rem" }}>
          {formattedDate}
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
