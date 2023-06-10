"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Box, IconButton, Typography } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { fit } from "@cloudinary/url-gen/actions/resize";

import { IProduct } from "#/interfaces/IProduct";
import { UP_LG, UP_SM } from "#/utils/constants";
import { rgbDataURL } from "#/utils/strings";
import cloudinary from "#/utils/cloudinary";

import AppImage from "./AppImage";
import Carroussel from "./Carroussel";
interface IProps {
  product: IProduct;
}

export default function Product({ product }: IProps) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const { description, designer, image, marque, medias, titre } =
    product.attributes;
  const { alternativeText, hash } = image?.data?.attributes ?? {};

  const srcCloudinary = cloudinary
    .image(hash)
    .resize(fit().width(800).height(800))
    .toURL();

  const carrousselList = medias?.data?.map(({ attributes }) =>
    cloudinary
      .image(attributes.hash)
      .resize(fit().width(850).height(800))
      .toURL()
  );

  const handleDownloadPDF = async () => {
    setLoading(true);
    fetch(
      `/api/download-pdf?title=${titre}&brand=${marque}&imageUrl=${srcCloudinary}&pageUrl=${pathname}`
    )
      .then((response) => {
        setLoading(false);
        if (response.ok) {
          return response.blob();
        } else {
          throw new Error("Network response was not ok.");
        }
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${titre.split(" ").join("_")}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error downloading PDF:", error);
      });
  };

  return (
    <Box sx={{ position: "relative" }}>
      <IconButton
        onClick={handleDownloadPDF}
        disabled={loading}
        aria-label={loading ? "Génération du PDF..." : "Télécharger PDF"}
        component="label"
        sx={{
          position: { xs: "relative", lg: "absolute" },
          top: -10,
          right: 0,
          display: "flex",
          alignItems: "center",
          gap: "0.8rem",
          borderRadius: "0.8rem",
          width: "fit-content",
          marginTop: "0.8rem",
          path: { fill: "#010101" },
          paddingX: { xs: "2.4rem", lg: 0 },
        }}
      >
        <PictureAsPdfIcon />
        <Typography variant="body1">Télécharger cette fiche</Typography>
      </IconButton>
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
        {srcCloudinary && (
          <AppImage
            alt={alternativeText ?? "Product image"}
            src={srcCloudinary}
            height={800}
            width={800}
            style={{ objectFit: "cover" }}
            placeholder="blur"
            blurDataURL={rgbDataURL(233, 243, 240)}
          />
        )}
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
      {carrousselList && (
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
      )}
    </Box>
  );
}
