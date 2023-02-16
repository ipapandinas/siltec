"use client";

import { Box, Typography } from "@mui/material";
import { IProduct } from "#/interfaces/IProduct";

import AppImage from "./AppImage";
import Container from "./Container";
import Carrousel from "./Carroussel";

interface IProps {
  product: IProduct;
}

export default function Product({ product }: IProps) {
  const { designer, image, marque, medias, titre, typology } =
    product.attributes;
  const { alternativeText, url } = image?.data?.attributes ?? {};
  const typo = typology.data.attributes.titre;

  const carrouselList = medias?.data?.map(({ attributes }) => attributes.url);

  return (
    <>
      <Container>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: "8rem",
          }}
        >
          {url && (
            <AppImage
              alt={alternativeText ?? "Product image"}
              src={url}
              width={600}
              height={600}
              loadMode="lg"
              style={{ objectFit: "cover" }}
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
              <Typography
                fontWeight="bold"
                textTransform="capitalize"
                variant="h3"
              >
                {titre}
              </Typography>
              <Typography textTransform="capitalize" variant="body1">
                {marque}
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
              {designer && (
                <Typography
                  textTransform="capitalize"
                  variant="body1"
                >{`Designer: ${designer}`}</Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Container>
      {carrouselList && (
        <Container>
          <Carrousel list={carrouselList} />
        </Container>
      )}
    </>
  );
}
