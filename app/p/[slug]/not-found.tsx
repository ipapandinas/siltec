import { Box, Typography } from "@mui/material";

import { getCollections } from "#/lib/getCollections";
import AppLink from "#/ui/AppLink";
import Container from "#/ui/Container";
import Explore from "#/ui/Explore";

export default async function NotFound() {
  const collections = await getCollections();

  return (
    <Container
      id="productNotFoundContainer"
      sx={{
        marginX: { xs: "2.4rem", lg: "0" },
        padding: { xs: "4.8rem 0", lg: "4rem" },
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h3" sx={{ textTransform: "uppercase", fontWeight: 300 }}>
          Produit introuvable
        </Typography>
        <Typography sx={{ marginTop: "1.6rem" }}>
          Ce produit n&apos;est pas disponible ou ne contient pas de média affichable.
        </Typography>
      </Box>

      {collections?.length ? (
        <Box sx={{ marginTop: { xs: "6rem", lg: "8rem" } }}>
          <Typography
            variant="h4"
            textAlign="center"
            sx={{ fontWeight: 300, textTransform: "uppercase", marginBottom: "4rem" }}
          >
            EXPLORER NOS COLLECTIONS
          </Typography>
          <Explore items={collections.slice(0, 9)} subPath="c" />
        </Box>
      ) : null}
    </Container>
  );
}
