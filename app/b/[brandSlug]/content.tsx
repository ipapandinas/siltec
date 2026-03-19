"use client";

import { Box, Typography } from "@mui/material";

import { IProduct } from "#/interfaces/IProduct";
import Explore from "#/ui/Explore";

interface Props {
  products: IProduct[];
}

export default function Content({ products }: Props) {
  return (
    <Box>
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
