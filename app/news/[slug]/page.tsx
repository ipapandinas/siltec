import { getSingleNews } from "#/lib/getNews";
import Band from "#/ui/Band";
import Breadcrumbs from "#/ui/Breadcrumbs";
import Container from "#/ui/Container";

import Content from "./content";

export default async function Page({ params }: any) {
  const { slug } = params;
  const news = await getSingleNews(slug);

  if (!news) return null; //todo: 404

  const { corps, medias, titre } = news.attributes;

  return (
    <div>
      <Container id="lastContainer">
        <Band text={titre} />
        <div style={{ marginTop: "4rem" }}>
          <Breadcrumbs
            list={[{ name: "Actualités", href: "/news" }]}
            pageName={titre}
          />
        </div>
        <div style={{ marginTop: "8rem" }}>
          <Content titre={titre} description={corps} medias={medias} />
        </div>
      </Container>
    </div>
  );
}
