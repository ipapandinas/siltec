import { IProject } from "#/interfaces/IProject";
import ProjectsGrid from "./ProjectsGrid";

export default function ProjectsSection({
  projects,
}: {
  projects: IProject[];
}) {
  return <ProjectsGrid projects={projects} />;
}
