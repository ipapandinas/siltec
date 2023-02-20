import { getSingleNews } from "#/lib/getNews";
import Container from "#/ui/Container";
import SinglePageHeader from "#/ui/SinglePageHeader";

import Content from "./content";

export default async function Page({ params }: any) {
  const { id } = params;
  const news = await getSingleNews(id);

  if (!news) return null; //todo: 404

  const { corps, medias, titre } = news.attributes;

  return (
    <div>
      <Container>
        <SinglePageHeader title={titre} />
      </Container>
      <Container id="lastContainer">
        <Content description={corps} medias={medias} />
      </Container>
    </div>
  );
}
