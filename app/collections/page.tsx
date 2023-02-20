import { getCollections, getCollectionSinglePage } from "#/lib/getCollections";
import Container from "#/ui/Container";
import Explore from "#/ui/Explore";
import SinglePageHeader from "#/ui/SinglePageHeader";

export default async function Collections() {
  const pageData = await getCollectionSinglePage();
  const collections = await getCollections();

  if (!pageData || !collections) return null; //todo: 404

  const { couleur, sousTitre, titre } = pageData.attributes;

  return (
    <div>
      <Container id="lastContainer">
        <SinglePageHeader color={couleur} subtitle={sousTitre} title={titre} />
        <div style={{ marginTop: "8rem" }}>
          <Explore items={collections} subPath="c" />
        </div>
      </Container>
    </div>
  );
}
