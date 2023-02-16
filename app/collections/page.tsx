import { getCollections, getCollectionSinglePage } from "#/lib/getCollections";
import Container from "#/ui/Container";
import Explore from "#/ui/Explore";
import SinglePageHeader from "#/ui/SinglePageHeader";

export default async function Collections() {
  const pageData = await getCollectionSinglePage();
  const collections = await getCollections();

  const { couleur, sousTitre, titre } = pageData.attributes;

  return (
    <div>
      <Container>
        <SinglePageHeader color={couleur} subtitle={sousTitre} title={titre} />
      </Container>
      <Container>
        <Explore items={[...collections, ...collections]} subPath="c" />
      </Container>
    </div>
  );
}
