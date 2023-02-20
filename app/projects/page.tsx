import { getProjects, getProjectSinglePage } from "#/lib/getProjects";
import Container from "#/ui/Container";
import Explore from "#/ui/Explore";
import SinglePageHeader from "#/ui/SinglePageHeader";

export default async function Projects() {
  const pageData = await getProjectSinglePage();
  const projects = await getProjects();

  if (!pageData) return null; //todo: 404
  if (!projects) return null; //todo: 404

  const { couleur, sousTitre, titre } = pageData.attributes;

  return (
    <div>
      <Container id="lastContainer">
        <SinglePageHeader color={couleur} subtitle={sousTitre} title={titre} />
        <div style={{ marginTop: "8rem" }}>
          <Explore items={projects} subPath="projects" isLeafPage />
        </div>
      </Container>
    </div>
  );
}
