import { notFound } from "next/navigation";

import {
  getCollectionSinglePage,
  getCollectionTitle,
} from "#/lib/getCollections";
import { getTypologies } from "#/lib/getTypologies";
import Band from "#/ui/Band";
import Breadcrumbs from "#/ui/Breadcrumbs";
import Container from "#/ui/Container";
import Explore from "#/ui/Explore";
import { COLOR_SECONDARY_MAIN } from "#/utils/constants";

export default async function Page({ params }: any) {
  const { collectionSlug } = params;
  const title = await getCollectionTitle(collectionSlug);
  const pageData = await getCollectionSinglePage();
  const typologies = await getTypologies(collectionSlug);

  if (!pageData || !typologies) notFound();

  const { couleur } = pageData.attributes;
  const pageName = title ?? collectionSlug;

  return (
    <>
      <Container id="lastContainer">
        <Band color={couleur ?? COLOR_SECONDARY_MAIN} text={pageName} />
        <div style={{ marginTop: "4rem" }}>
          <Breadcrumbs
            list={[{ name: "Collections", href: "/collections" }]}
            pageName={pageName}
          />
        </div>
        <div style={{ marginTop: "8rem" }}>
          <Explore items={typologies} subPath={`c/${collectionSlug}`} />
        </div>
      </Container>
    </>
  );
}
