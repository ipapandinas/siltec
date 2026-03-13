"use client";

import { Box, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";

import { IBrand } from "#/interfaces/IBrand";
import { IProduct } from "#/interfaces/IProduct";
import Explore from "#/ui/Explore";

interface Props {
  brand: IBrand;
  bannerUrl?: string | null;
  products: IProduct[];
}

export default function Content({ brand, bannerUrl, products }: Props) {
  return (
    <Box>
      {bannerUrl ? (
        <Box
          component="img"
          src={bannerUrl}
          alt={brand.banner?.alternativeText ?? brand.nom}
          sx={{
            width: "100%",
            maxHeight: { xs: 320, lg: 520 },
            objectFit: "cover",
            borderTopLeftRadius: { xs: "3.2rem", lg: "6.4rem" },
            borderBottomRightRadius: { xs: "3.2rem", lg: "6.4rem" },
          }}
        />
      ) : null}

      {brand.description ? (
        <Box
          sx={{
            mt: { xs: "3.2rem", lg: "4.8rem" },
            maxWidth: "900px",
            marginInline: "auto",
            px: { xs: 0, lg: "2rem" },
            "& p": { textAlign: "justify" },
          }}
        >
          <ReactMarkdown>{brand.description}</ReactMarkdown>
        </Box>
      ) : null}

      {products.length > 0 ? (
        <Box sx={{ mt: { xs: "5.6rem", lg: "8rem" } }}>
          <Explore items={products} subPath="p" />
        </Box>
      ) : (
        <Box sx={{ mt: { xs: "4rem", lg: "5.6rem" } }}>
          <Typography variant="h5" textAlign="center">
            Aucun produit n’est encore associé à cette marque.
          </Typography>
        </Box>
      )}
    </Box>
  );
}
