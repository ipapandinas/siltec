"use client";

import { Box, Typography } from "@mui/material";

import { ICollection } from "#/interfaces/ICollection";
import { IProduct } from "#/interfaces/IProduct";
import Explore from "#/ui/Explore";

interface Props {
  products: IProduct[];
  collections: ICollection[];
}

export default function Content({ products, collections }: Props) {
  const featuredCollections = collections.slice(0, 6);

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

          {featuredCollections.length > 0 ? (
            <Box sx={{ mt: { xs: "5.6rem", lg: "8rem" } }}>
              <Typography
                variant="h4"
                textAlign="center"
                sx={{ fontWeight: 300, textTransform: "uppercase" }}
              >
                Explorer nos collections
              </Typography>
              <Box sx={{ mt: { xs: "4rem", lg: "5.6rem" } }}>
                <Explore items={featuredCollections} subPath="c" />
              </Box>
            </Box>
          ) : null}
        </Box>
      )}
    </Box>
  );
}
