import { getSingleNews } from "#/lib/getNews";
import Band from "#/ui/Band";
import Breadcrumbs from "#/ui/Breadcrumbs";
import Container from "#/ui/Container";

import Content from "./content";

export default async function Page({ params }: any) {
  const { id } = params;
  const news = await getSingleNews(id);

  if (!news) return null; //todo: 404

  const { corps, medias, titre } = news.attributes;

  return (
    <div>
      <Container>
        <Band text={titre} />
        <div style={{ marginTop: "4rem" }}>
          <Breadcrumbs
            list={[{ name: "Actualités", href: "/news" }]}
            pageName={titre}
          />
        </div>
      </Container>
      <Container id="lastContainer">
        <Content description={corps} medias={medias} />
      </Container>
    </div>
  );
}
