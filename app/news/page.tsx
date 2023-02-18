import { getNews, getNewsSinglePage } from "#/lib/getNews";
import Container from "#/ui/Container";
import Explore from "#/ui/Explore";
import SinglePageHeader from "#/ui/SinglePageHeader";

export default async function News() {
  const pageData = await getNewsSinglePage();
  const news = await getNews();

  if (!pageData) return null; //todo: 404

  const { couleur, sousTitre, titre } = pageData.attributes;

  return (
    <div>
      <Container>
        <SinglePageHeader color={couleur} subtitle={sousTitre} title={titre} />
      </Container>
      <Container id="lastContainer">
        <Explore items={news} subPath="n" />
      </Container>
    </div>
  );
}
