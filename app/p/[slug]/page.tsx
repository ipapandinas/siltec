import { Box, Button, Typography } from "@mui/material";
import { notFound } from "next/navigation";

import { getCollectionSinglePage, getCollections } from "#/lib/getCollections";
import { getHome } from "#/lib/getHome";
import { getProduct, getProducts } from "#/lib/getProducts";
import { buildMediaCarouselUrls, resolveImageUrl } from "#/utils/media";
import { COLOR_PRIMARY_MAIN } from "#/utils/constants";
import Breadcrumbs from "#/ui/Breadcrumbs";
import Container from "#/ui/Container";
import Explore from "#/ui/Explore";
import AppLink from "#/ui/AppLink";
import Product from "#/ui/Product";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [pageData, product, collections, home] = await Promise.all([
    getCollectionSinglePage(),
    getProduct(slug),
    getCollections(),
    getHome(),
  ]);

  if (!pageData || !product) notFound();

  const hasRenderableMedia = buildMediaCarouselUrls(product.medias).length > 0;

  if (!hasRenderableMedia) notFound();

  const { couleur, couleurBoutonDemandeInformations } = pageData;

  const isHexColor = (value: unknown): value is string =>
    typeof value === "string" && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);

  const voirPlusColorValue = home?.homepage?.couleurBoutonVoirPlus;
  const resolvedVoirPlusColor = isHexColor(voirPlusColorValue)
    ? voirPlusColorValue
    : COLOR_PRIMARY_MAIN;
  const pageName = product.titre;
  const relationBrandSlug = product.marque?.slug?.trim();
  const brandHref = relationBrandSlug ? `/b/${relationBrandSlug}` : null;
  const collection = product.collections?.[0];
  const typology = product.typologies?.[0];

  const relatedProductsRaw =
    collection?.slug && typology?.slug
      ? await getProducts(collection.slug, typology.slug)
      : [];

  const relatedProducts =
    relatedProductsRaw
      ?.filter(
        (relatedProduct): relatedProduct is NonNullable<typeof relatedProduct> =>
          Boolean(
            relatedProduct &&
              relatedProduct.slug &&
              relatedProduct.slug !== slug &&
              resolveImageUrl(relatedProduct.medias?.[0] ?? null)
          )
      )
      .slice(0, 3) ?? [];

  const pluralizeTypologyTitle = (value: string) => {
    const normalized = value.trim();
    const lower = normalized.toLowerCase();

    if (!normalized) return normalized;
    if (/(s|x|z)$/.test(lower)) return normalized;
    if (/(eau|au|eu)$/.test(lower)) return `${normalized}x`;
    if (/al$/.test(lower)) return `${normalized.slice(0, -2)}aux`;

    return `${normalized}s`;
  };

  const relatedProductsTitle =
    typology && relatedProducts.length > 1
      ? `Explorer plus de ${pluralizeTypologyTitle(typology.titre)}`
      : typology
        ? `Explorer ${typology.titre}`
        : "";

  const shuffleCollections = <T,>(list: T[]) => {
    const copy = [...list];

    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy;
  };

  const collectionCards =
    shuffleCollections(
      (collections ?? [])
        .filter((item) => item.slug !== collection?.slug)
        .slice(0, 5)
    ).slice(0, 3);

  return (
    <div>
      <Container
        id="productPageContainer"
        sx={{
          marginX: { xs: "2.4rem", lg: "0" },
          padding: { xs: "4.8rem 0", lg: "4rem" },
        }}
      >
        <Box sx={{ paddingLeft: { xs: "2.4rem", lg: "0" } }}>
          <Breadcrumbs
            list={[
              { name: "Collections", href: "/collections" },
              {
                name: collection?.titre,
                href: `/c/${collection?.slug}`,
              },
              {
                name: typology?.titre,
                href: `/c/${collection?.slug}/${typology?.slug}`,
              },
            ]}
            pageName={pageName}
          />
        </Box>

        <div style={{ marginTop: "2.4rem" }}>
          <Product
            product={product}
            quoteButtonColor={couleurBoutonDemandeInformations ?? couleur}
            brandHref={brandHref}
          />
        </div>

        {relatedProducts.length > 0 && typology ? (
          <Box sx={{ marginTop: { xs: "8rem", lg: "12rem" }, paddingX: "2.4rem" }}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: { xs: "4rem", lg: "6rem" } }}>
              <Box sx={{ width: "6.4rem", height: "1px", bgcolor: "rgba(0,0,0,0.2)" }} />
            </Box>
            <Typography
              variant="h4"
              textAlign="center"
              sx={{ fontWeight: 300, textTransform: "uppercase" }}
            >
              {relatedProductsTitle}
            </Typography>
            <Box sx={{ marginTop: { xs: "4rem", lg: "5.6rem" } }}>
              <Explore items={relatedProducts} subPath="p" />
            </Box>
          </Box>
        ) : null}

        {collectionCards.length > 0 ? (
          <Box sx={{ marginTop: { xs: "8rem", lg: "10rem" }, paddingX: "2.4rem" }}>
            <Typography variant="h4" textAlign="center" sx={{ fontWeight: 300, textTransform: "uppercase" }}>
              EXPLORER NOS COLLECTIONS
            </Typography>
            <Box sx={{ marginTop: { xs: "4rem", lg: "5.6rem" } }}>
              <Explore items={collectionCards} subPath="c" />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", mt: { xs: "3.2rem", lg: "4rem" } }}>
              <AppLink href="/collections" title="Voir plus de collections">
                <Button
                  disableElevation
                  variant="contained"
                  sx={{
                    borderRadius: "3rem",
                    px: "2.4rem",
                    py: "1rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    bgcolor: resolvedVoirPlusColor,
                    "&:hover": {
                      bgcolor: resolvedVoirPlusColor,
                      opacity: 0.9,
                    },
                  }}
                >
                  Voir plus
                </Button>
              </AppLink>
            </Box>
          </Box>
        ) : null}
      </Container>
    </div>
  );
}
