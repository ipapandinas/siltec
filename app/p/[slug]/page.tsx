import { Box, Typography } from "@mui/material";
import { notFound } from "next/navigation";

import { getCollectionSinglePage, getCollections } from "#/lib/getCollections";
import { getProduct, getProducts } from "#/lib/getProducts";
import { buildMediaCarouselUrls, resolveImageUrl } from "#/utils/media";
import Breadcrumbs from "#/ui/Breadcrumbs";
import Container from "#/ui/Container";
import Card from "#/ui/Card";
import Product from "#/ui/Product";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pageData = await getCollectionSinglePage();
  const product = await getProduct(slug);
  const collections = await getCollections();

  if (!pageData || !product) notFound();

  const hasRenderableMedia =
    buildMediaCarouselUrls(product.image, product.medias).length > 0;

  if (!hasRenderableMedia) notFound();

  const { couleur, couleurBoutonDemandeInformations } = pageData;
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
              resolveImageUrl(relatedProduct.image)
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

  const collectionCards =
    collections
      ?.filter((item) => item.slug !== collection?.slug)
      .slice(0, 5) ?? [];

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
            <Box
              sx={{
                marginTop: { xs: "4rem", lg: "5.6rem" },
                display: "flex",
                gap: { xs: "2rem", lg: "3.2rem" },
                overflowX: { xs: "auto", lg: "visible" },
                pb: { xs: "1rem", lg: 0 },
              }}
            >
              {relatedProducts.map((relatedProduct) => (
                <Box
                  key={relatedProduct.documentId}
                  sx={{
                    width: { xs: "280px", lg: "auto" },
                    flex: { xs: "0 0 auto", lg: "1 1 0" },
                    minWidth: 0,
                    ".MuiCard-root": {
                      height: "100%",
                    },
                    ".MuiCardMedia-root": {
                      height: { xs: 320, lg: 420 },
                    },
                  }}
                >
                  <Card
                    href={`/p/${relatedProduct.slug}`}
                    image={relatedProduct.image ?? null}
                    imageAlt={relatedProduct.image?.alternativeText ?? relatedProduct.titre}
                    label={relatedProduct.titre}
                    title={relatedProduct.titre}
                    cornerVariant="default"
                  />
                </Box>
              ))}
            </Box>
          </Box>
        ) : null}

        {collectionCards.length > 0 ? (
          <Box sx={{ marginTop: { xs: "8rem", lg: "10rem" }, paddingX: "2.4rem" }}>
            <Typography variant="h4" textAlign="center" sx={{ fontWeight: 300, textTransform: "uppercase" }}>
              EXPLORER NOS COLLECTIONS
            </Typography>
            <Box
              sx={{
                marginTop: { xs: "4rem", lg: "5.6rem" },
                display: "flex",
                gap: { xs: "2rem", lg: "2.4rem" },
                overflowX: "auto",
                pb: "1rem",
              }}
            >
              {collectionCards.map((collectionItem) => (
                <Box
                  key={collectionItem.documentId}
                  sx={{
                    width: { xs: "280px", lg: "293px" },
                    flex: "0 0 auto",
                    ".MuiCard-root": {
                      height: "100%",
                    },
                    ".MuiCardMedia-root": {
                      height: { xs: 320, lg: 420 },
                    },
                  }}
                >
                  <Card
                    href={`/c/${collectionItem.slug}`}
                    image={collectionItem.image}
                    imageAlt={collectionItem.image?.alternativeText ?? collectionItem.titre}
                    label={collectionItem.titre}
                    title={collectionItem.titre}
                    cornerVariant="default"
                  />
                </Box>
              ))}
            </Box>
          </Box>
        ) : null}
      </Container>
    </div>
  );
}
