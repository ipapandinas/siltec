import { getProjects, getProjectSinglePage } from "#/lib/getProjects";
import Container from "#/ui/Container";
import Explore from "#/ui/Explore";
import SinglePageHeader from "#/ui/SinglePageHeader";

export default async function Projects() {
  const pageData = await getProjectSinglePage();
  const projects = await getProjects();

  const { couleur, sousTitre, titre } = pageData.attributes;

  return (
    <div>
      <Container>
        <SinglePageHeader color={couleur} subtitle={sousTitre} title={titre} />
      </Container>
      <Container>
        <Explore items={projects} subPath="p" />
      </Container>
    </div>
  );
}
