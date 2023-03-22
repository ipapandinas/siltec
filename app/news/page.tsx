import { notFound } from "next/navigation";

import { getNews, getNewsSinglePage } from "#/lib/getNews";
import Container from "#/ui/Container";
import Explore from "#/ui/Explore";
import SinglePageHeader from "#/ui/SinglePageHeader";

export default async function News() {
  const pageData = await getNewsSinglePage();
  const news = await getNews();

  if (!pageData || !news) notFound();

  const { couleur, sousTitre, titre } = pageData.attributes;

  return (
    <div>
      <Container id="lastContainer">
        <SinglePageHeader color={couleur} subtitle={sousTitre} title={titre} />
        <div style={{ marginTop: "8rem" }}>
          <Explore items={news} subPath="news" />
        </div>
      </Container>
    </div>
  );
}
