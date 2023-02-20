import { getCollectionTitle } from "#/lib/getCollections";
import { getTypologies } from "#/lib/getTypologies";
import Band from "#/ui/Band";
import Container from "#/ui/Container";
import Explore from "#/ui/Explore";
import { COLOR_SECONDARY_MAIN } from "#/utils/constants";

export default async function Page({ params }: any) {
  const { collectionSlug } = params;
  const title = await getCollectionTitle(collectionSlug);
  const typologies = await getTypologies(collectionSlug);

  return (
    <>
      <Container>
        <Band color={COLOR_SECONDARY_MAIN} text={title ?? collectionSlug} />
      </Container>
      <Container>
        <Explore items={typologies} subPath={`c/${collectionSlug}`} />
      </Container>
    </>
  );
}
