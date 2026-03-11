import { notFound } from "next/navigation";

import { getProduct } from "#/lib/getProducts";
import Band from "#/ui/Band";
import Breadcrumbs from "#/ui/Breadcrumbs";
import Container from "#/ui/Container";
import Product from "#/ui/Product";
import { COLOR_SECONDARY_MAIN } from "#/utils/constants";
import { getCollectionSinglePage } from "#/lib/getCollections";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pageData = await getCollectionSinglePage();
  const product = await getProduct(slug);

  if (!pageData || !product) notFound();

  const { couleur } = pageData;
  const titre = product.titre;
  const pageName = titre;
  const collection = product.collections?.[0];
  const typology = product.typologies?.[0];

  return (
    <div>
      <Container
        id="productPageContainer"
        sx={{
          marginX: { xs: "2.4rem", lg: "0" },
          padding: { xs: "4.8rem 0", lg: "4rem" },
        }}
      >
        <div style={{ paddingLeft: "2.4rem", paddingRight: "2.4rem" }}>
          <Band color={couleur ?? COLOR_SECONDARY_MAIN} text={pageName} />
        </div>
        <div style={{ marginTop: "4rem", paddingLeft: "2.4rem" }}>
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
        </div>
        <div style={{ marginTop: "4rem" }}>
          <Product product={product} />
        </div>
      </Container>
    </div>
  );
}
