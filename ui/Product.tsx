"use client";

import ReactMarkdown from "react-markdown";
import { Box, IconButton, Typography } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { IProduct } from "#/interfaces/IProduct";

import AppImage from "./AppImage";
import Carroussel from "./Carroussel";
import AppLink from "./AppLink";

interface IProps {
  product: IProduct;
}

export default function Product({ product }: IProps) {
  const {
    description,
    document,
    designer,
    image,
    marque,
    medias,
    picto,
    titre,
    typology,
  } = product.attributes;
  const { alternativeText, url } = image?.data?.attributes ?? {};
  const { alternativeText: altPicto, url: urlPicto } =
    picto?.data?.attributes ?? {};
  const typo = typology.data?.attributes.titre;

  const carrousselList = medias?.data?.map(({ attributes }) => attributes.url);

  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          img: {
            width: "50% !important",
          },
        }}
      >
        {url && (
          <AppImage
            alt={alternativeText ?? "Product image"}
            src={url}
            fill
            style={{ objectFit: "cover" }}
          />
        )}
        <Box
          sx={{
            width: "50% !important",
            padding: "4rem",
            bgcolor: "#fff",
            height: "100%",
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
            <Typography
              fontWeight="bold"
              textTransform="capitalize"
              variant="h5"
            >
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
          {/* {document && document.data && (
            <Box
              sx={{
                marginTop: "1.6rem",
              }}
            >
              <AppLink href={document.data.attributes.url}>
                <IconButton
                  aria-label="Télécharger le PDF"
                  component="label"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.8rem",
                    borderRadius: "0.8rem",
                    width: "fit-content",
                    marginTop: "0.8rem",
                    path: { fill: "#010101" },
                  }}
                >
                  <PictureAsPdfIcon />
                  <Typography textTransform="capitalize" variant="body1">
                    Télécharger le PDF
                  </Typography>
                </IconButton>
              </AppLink>
            </Box>
          )} */}
          {urlPicto && (
            <Box
              sx={{
                marginTop: "4rem",
                img: { width: "50% !important", height: "auto" },
              }}
            >
              <AppImage
                alt={altPicto ?? "Product picto"}
                src={urlPicto}
                width={200}
                height={200}
                loadMode="md"
                style={{ objectFit: "cover" }}
              />
            </Box>
          )}
          <Box
            mt="4rem"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              img: {
                width: "100% !important",
              },
            }}
          >
            {(designer || typo) && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "center",
                }}
              >
                {typo && (
                  <Typography
                    textTransform="capitalize"
                    variant="body1"
                  >{`Typologie: ${typo}`}</Typography>
                )}
                {designer && (
                  <Typography
                    textTransform="capitalize"
                    variant="body1"
                  >{`Designer: ${designer}`}</Typography>
                )}
              </Box>
            )}
            <AppLink href="/" title="Page d'accueil">
              <AppImage
                alt="Siltec logo"
                src="/siltec.svg"
                width={70}
                height={40}
              />
            </AppLink>
          </Box>
        </Box>
      </Box>
      {carrousselList && (
        <Box marginTop="16rem">
          <Carroussel list={carrousselList} />
        </Box>
      )}
    </Box>
  );
}
