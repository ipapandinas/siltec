import { notFound } from "next/navigation";

import { getProduct } from "#/lib/getProducts";
import Band from "#/ui/Band";
import Breadcrumbs from "#/ui/Breadcrumbs";
import Container from "#/ui/Container";
import Product from "#/ui/Product";
import { COLOR_SECONDARY_MAIN } from "#/utils/constants";

export default async function Page({ params }: any) {
  const { slug } = params;
  const product = await getProduct(slug);

  if (!product) notFound();

  const titre = product.attributes.titre;
  const marque = product.attributes.marque;
  const pageName = titre + `${marque ? ` - ${marque}` : ""}`;
  const { titre: collectionTitle, slug: collectionSlug } =
    product.attributes.collections.data?.attributes ?? {};
  const { titre: typologyTitle, slug: typologySlug } =
    product.attributes.typologies.data?.attributes ?? {};

  return (
    <div>
      <Container id="lastContainer">
        <Band color={COLOR_SECONDARY_MAIN} text={pageName} />
        <div style={{ marginTop: "4rem" }}>
          <Breadcrumbs
            list={[
              { name: "Collections", href: "/collections" },
              {
                name: collectionTitle,
                href: `/c/${collectionSlug}`,
              },
              {
                name: typologyTitle,
                href: `/c/${collectionSlug}/${typologySlug}`,
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