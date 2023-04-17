import { notFound } from "next/navigation";

import {
  getCollectionSinglePage,
  getCollectionTitle,
} from "#/lib/getCollections";
import { getProducts } from "#/lib/getProducts";
import { getTypologyTitle } from "#/lib/getTypologies";
import Band from "#/ui/Band";
import Breadcrumbs from "#/ui/Breadcrumbs";
import Container from "#/ui/Container";
import Explore from "#/ui/Explore";
import { COLOR_SECONDARY_MAIN } from "#/utils/constants";

export default async function Page({ params }: any) {
  const { collectionSlug, typologySlug } = params;
  const collectionTitle = await getCollectionTitle(collectionSlug);
  const pageData = await getCollectionSinglePage();
  const typologyTitle = await getTypologyTitle(typologySlug);
  const products = await getProducts(collectionSlug, typologySlug);

  if (!pageData || !products) notFound();

  const { couleur } = pageData.attributes;
  const pageName = typologyTitle ?? typologySlug;

  return (
    <div>
      <Container id="lastContainer">
        <Band color={couleur ?? COLOR_SECONDARY_MAIN} text={pageName} />
        <div style={{ marginTop: "4rem" }}>
          <Breadcrumbs
            list={[
              { name: "Collections", href: "/collections" },
              {
                name: collectionTitle ?? collectionSlug,
                href: `/c/${collectionSlug}`,
              },
            ]}
            pageName={pageName}
          />
        </div>
        <div style={{ marginTop: "8rem" }}>
          <Explore items={products} subPath="p" />
        </div>
      </Container>
    </div>
  );
}
