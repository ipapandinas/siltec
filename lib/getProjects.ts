import { cache } from "react";

import { GRAPHQL_API_URL, REVALIDATE_SLOW } from "#/utils/constants";
import {
  queryProject,
  queryProjects,
  queryProjectSinglePage,
} from "#/utils/queries";
import { IProject, IProjectSinglePage } from "#/interfaces/IProject";

type GraphqlProjectsResponse<TProject> = {
  data?: { projects?: TProject[] };
  errors?: Array<{ message?: string }>;
};

type ProjectQueryResult = Omit<IProject, "image">;

function withFallbackImage(project: ProjectQueryResult): IProject {
  return {
    ...project,
    image: project.medias?.[0] ?? null,
  };
}

function extractProjects<TProject>(content: GraphqlProjectsResponse<TProject>): TProject[] {
  if (content.errors?.length) {
    throw new Error(
      `GraphQL errors: ${content.errors
        .map(({ message }) => message || "Unknown GraphQL error")
        .join(" | ")}`
    );
  }

  return content.data?.projects ?? [];
}

export const getProjects = cache(async () => {
  try {
    const query = queryProjects();
    return await fetch(GRAPHQL_API_URL, {
      next: { revalidate: REVALIDATE_SLOW },
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
      }),
    })
      .then((response) => response.json())
      .then((content: GraphqlProjectsResponse<ProjectQueryResult>) =>
        extractProjects(content).map(withFallbackImage)
      );
  } catch (err: any) {
    console.error(
      `Projects could not have been fetched - Detail: ${
        err?.message ? err.message : JSON.stringify(err)
      }`
    );

    return [];
  }
});

export const getProject = cache(async (slug: string) => {
  try {
    const query = queryProject(slug);
    return await fetch(GRAPHQL_API_URL, {
      next: { revalidate: REVALIDATE_SLOW },
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
      }),
    })
      .then((response) => response.json())
      .then((content: GraphqlProjectsResponse<ProjectQueryResult>) => {
        const project = extractProjects(content)[0];
        return project ? withFallbackImage(project) : null;
      });
  } catch (err: any) {
    console.error(
      `Project could not have been fetched - Detail: ${
        err?.message ? err.message : JSON.stringify(err)
      }`
    );

    return null;
  }
});

export const getProjectSinglePage = cache(async () => {
  try {
    const query = queryProjectSinglePage();
    return await fetch(GRAPHQL_API_URL, {
      next: { revalidate: REVALIDATE_SLOW },
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
      }),
    })
      .then((response) => response.json())
      .then(
        (content: {
          data: { hubDeRealisation: IProjectSinglePage };
        }) => content.data.hubDeRealisation
      );
  } catch (err: any) {
    console.error(
      `Project single page could not have been fetched - Detail: ${
        err?.message ? err.message : JSON.stringify(err)
      }`
    );
  }
});
