import { getAboutSinglePage } from "#/lib/getAbout";
import Container from "#/ui/Container";
import SinglePageHeader from "#/ui/SinglePageHeader";

import Content from "./content";

export default async function About() {
  const pageData = await getAboutSinglePage();

  const { couleur, description, sousTitre, titre, trombinoscope } =
    pageData.attributes;

  return (
    <div>
      <Container>
        <SinglePageHeader color={couleur} subtitle={sousTitre} title={titre} />
      </Container>
      <Container>
        <Content description={description} trombinoscope={trombinoscope} />
      </Container>
    </div>
  );
}
