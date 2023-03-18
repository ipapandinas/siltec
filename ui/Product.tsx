"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Box, IconButton, Typography } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { IProduct } from "#/interfaces/IProduct";

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
  const { alternativeText, url } = image?.data?.attributes ?? {};

  const carrousselList = medias?.data?.map(({ attributes }) => attributes.url);

  const handleDownloadPDF = async () => {
    setLoading(true);
    fetch(
      `/api/download-pdf?title=${titre}&brand=${marque}&imageUrl=${url}&pageUrl=${pathname}`
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
        link.setAttribute("download", `${titre}.pdf`);
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
        }}
      >
        <PictureAsPdfIcon />
        <Typography textTransform="capitalize" variant="body1">
          Télécharger le PDF
        </Typography>
      </IconButton>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          img: {
            borderTopRightRadius: { xs: "4rem", lg: "8rem" },
            borderBottomLeftRadius: { xs: "4rem", lg: "8rem" },
            width: { xs: "100% !important", lg: "auto" },
            height: { xs: "auto !important", lg: "auto" },
          },
        }}
      >
        {url && (
          <AppImage
            alt={alternativeText ?? "Product image"}
            src={url}
            height={600}
            width={600}
            style={{ objectFit: "cover" }}
          />
        )}
      </Box>
      <Box
        sx={{
          position: "relative",
          width: { xs: "100% !important", lg: "40%" },
          bottom: { xs: 50, lg: 100 },
          right: 0,
          bgcolor: "#fff",
          padding: "1.6rem 4rem",
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
              margin: "4rem 0",
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
          >{`Designer: ${designer}`}</Typography>
        )}
      </Box>
      {carrousselList && (
        <Box marginTop="4rem" sx={{ display: { xs: "none", lg: "block" } }}>
          <Carroussel list={carrousselList} />
        </Box>
      )}
    </Box>
  );
}
