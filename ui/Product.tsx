"use client";

import ReactMarkdown from "react-markdown";
import { Box, Typography } from "@mui/material";

import { IProduct } from "#/interfaces/IProduct";
import { resolveImageUrl } from "#/utils/media";
import { UP_LG, UP_SM } from "#/utils/constants";
import { rgbDataURL } from "#/utils/strings";

import AppImage from "./AppImage";
import Carroussel from "./Carroussel";
interface IProps {
  product: IProduct;
}

export default function Product({ product }: IProps) {
  const { description, designer, image, marque, medias, titre } = product;

  const productImageUrl = resolveImageUrl(image);

  const carrousselList = medias
    ?.map((media) => resolveImageUrl(media))
    .filter((url): url is string => Boolean(url));

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          img: {
            borderTopRightRadius: { xs: "4rem", lg: "8rem" },
            borderBottomLeftRadius: { xs: "4rem", lg: "8rem" },
            width: { xs: "400px", lg: "100% !important" },
            height: { xs: "400px", lg: "auto !important" },
            [UP_LG]: {
              maxWidth: 800,
              maxHeight: 800,
            },
          },
        }}
      >
        {productImageUrl ? (
          <AppImage
            alt={image?.alternativeText ?? "Product image"}
            src={productImageUrl}
            height={800}
            width={800}
            style={{ objectFit: "cover" }}
            placeholder="blur"
            blurDataURL={rgbDataURL(233, 243, 240)}
          />
        ) : null}
      </Box>
      <Box
        sx={{
          position: "relative",
          width: { xs: "400px", lg: "40%" },
          maxWidth: { xs: "400px", lg: "40%" },
          bottom: { xs: 50, lg: 100 },
          right: 0,
          bgcolor: "#fff",
          padding: "1.6rem 4rem",
          marginRight: { xs: "2.4rem", lg: 0 },
          height: "fit-content",
          borderTopLeftRadius: "4rem",
          borderBottomRightRadius: "4rem",
          marginLeft: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography fontWeight="bold" textTransform="capitalize" variant="h5">
            {titre}
          </Typography>
          <Typography color="#667" textTransform="capitalize" variant="h6">
            {marque}
          </Typography>
        </Box>
        {description && (
          <Box
            sx={{
              marginTop: "4rem",
              textAlign: "justify",
            }}
          >
            <ReactMarkdown>{description}</ReactMarkdown>
          </Box>
        )}
        {designer && (
          <Typography
            textTransform="capitalize"
            variant="body1"
            sx={{
              marginTop: "1.6rem",
            }}
          >{`Designer: ${designer}`}</Typography>
        )}
      </Box>
      {carrousselList && carrousselList.length > 0 ? (
        <Box
          marginTop="4rem"
          sx={{
            ".slick-slider": {
              overflow: "hidden",
              width: "100vw",
              height: "auto",
              maxHeight: "1000px",
              objectFit: "cover",
              margin: "0 auto",
              [UP_LG]: {
                borderTopLeftRadius: { xs: "4rem", lg: "8rem" },
                borderBottomRightRadius: { xs: "4rem", lg: "8rem" },
                width: "800px !important",
              },
            },

            ".slick-slide img": {
              height: "400px !important",
            },

            [UP_SM]: {
              ".slick-slide img": {
                height: "800px !important",
              },
            },
          }}
        >
          <Carroussel
            list={carrousselList}
            width={850}
            height={800}
            quality={100}
          />
        </Box>
      ) : null}
    </Box>
  );
}
