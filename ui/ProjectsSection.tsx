import { getProjects } from "#/lib/getProjects";
import ProjectsGrid from "./ProjectsGrid";

export default async function ProjectsSection() {
  const projects = await getProjects();

  if (!projects) return null; //todo: 404

  return <ProjectsGrid projects={projects.slice(0, 3)} />;
}
