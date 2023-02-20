import { getProject } from "#/lib/getProjects";
import Container from "#/ui/Container";
import SinglePageHeader from "#/ui/SinglePageHeader";

import Content from "./content";

export default async function Page({ params }: any) {
  const { id } = params;
  const project = await getProject(id);

  if (!project) return null; //todo: 404

  const { couleur, description, medias, titre } = project.attributes;

  return (
    <div>
      <Container>
        <SinglePageHeader color={couleur} title={titre} />
      </Container>
      <Container id="lastContainer">
        <Content description={description} medias={medias} />
      </Container>
    </div>
  );
}
