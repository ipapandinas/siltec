import { getAboutSinglePage } from "#/lib/getAbout";
import Container from "#/ui/Container";
import SinglePageHeader from "#/ui/SinglePageHeader";

import Content from "./content";

export default async function About() {
  const pageData = await getAboutSinglePage();

  if (!pageData) return null; //todo: 404

  const { couleur, description, sousTitre, titre, trombinoscope } =
    pageData.attributes;

  return (
    <div>
      <Container id="lastContainer">
        <SinglePageHeader color={couleur} subtitle={sousTitre} title={titre} />
        <div style={{ marginTop: "8rem" }}>
          <Content description={description} trombinoscope={trombinoscope} />
        </div>
      </Container>
    </div>
  );
}
