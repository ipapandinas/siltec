import { notFound } from "next/navigation";

import { getProject } from "#/lib/getProjects";
import Band from "#/ui/Band";
import Breadcrumbs from "#/ui/Breadcrumbs";
import Container from "#/ui/Container";

import Content from "./content";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) notFound();

  const { couleur, date, description, medias, titre } = project;

  return (
    <div>
      <Container id="lastContainer">
        <Band color={couleur} text={titre} />
        <div style={{ marginTop: "4rem" }}>
          <Breadcrumbs
            list={[{ name: "Réalisations", href: "/projects" }]}
            pageName={titre}
          />
        </div>
        <div style={{ marginTop: "8rem" }}>
          <Content date={date} description={description} medias={medias} />
        </div>
      </Container>
    </div>
  );
}
