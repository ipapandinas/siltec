"use client";

import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { IProduct } from "#/interfaces/IProduct";
import { API_URL } from "#/utils/constants";

interface IProps {
  product: IProduct;
}

export default function Product({ product }: IProps) {
  const { brand, collection, designer, image, title, typology } =
    product.attributes;
  const { alternativeText, url } = image?.data?.attributes ?? {};
  const typo = typology.data.attributes.title;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        gap: "8rem",
      }}
    >
      {url && (
        <img
          alt={alternativeText ?? "Product image"}
          src={`${API_URL}${url}`}
        />
      )}
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography fontWeight="bold" textTransform="capitalize" variant="h3">
            {title}
          </Typography>
          <Typography textTransform="capitalize" variant="body1">
            {brand}
          </Typography>
        </Box>
        <Box
          mt="8rem"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Typography
            textTransform="capitalize"
            variant="body1"
          >{`Typologie: ${typo}`}</Typography>
          {collection && (
            <Typography
              textTransform="capitalize"
              variant="body1"
            >{`Collection: ${collection}`}</Typography>
          )}
          {designer && (
            <Typography
              textTransform="capitalize"
              variant="body1"
            >{`Designer: ${designer}`}</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
