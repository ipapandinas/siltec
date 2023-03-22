import { GRAPHQL_API_URL } from "#/utils/constants";
import {
  queryProject,
  queryProjects,
  queryProjectSinglePage,
} from "#/utils/queries";
import { IProject, IProjectSinglePage } from "#/interfaces/IProject";

export const getProjects = async () => {
  try {
    const query = queryProjects();
    return await fetch(GRAPHQL_API_URL, {
      cache: "no-store",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
      }),
    })
      .then((response) => response.json())
      .then(
        (content: { data: { projects: { data: IProject[] } } }) =>
          content.data.projects.data
      );
  } catch (err: any) {
    console.error(
      `Projects could not have been fetched - Detail: ${
        err?.message ? err.message : JSON.stringify(err)
      }`
    );
  }
};

export const getProject = async (slug: string) => {
  try {
    const query = queryProject(slug);
    return await fetch(GRAPHQL_API_URL, {
      cache: "no-store",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
      }),
    })
      .then((response) => response.json())
      .then(
        (content: { data: { projects: { data: IProject[] } } }) =>
          content.data.projects.data[0] ?? null
      );
  } catch (err: any) {
    console.error(
      `Project could not have been fetched - Detail: ${
        err?.message ? err.message : JSON.stringify(err)
      }`
    );
  }
};

export const getProjectSinglePage = async () => {
  try {
    const query = queryProjectSinglePage();
    return await fetch(GRAPHQL_API_URL, {
      cache: "no-store",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
      }),
    })
      .then((response) => response.json())
      .then(
        (content: {
          data: { hubDeRealisation: { data: IProjectSinglePage } };
        }) => content.data.hubDeRealisation.data
      );
  } catch (err: any) {
    console.error(
      `Project single page could not have been fetched - Detail: ${
        err?.message ? err.message : JSON.stringify(err)
      }`
    );
  }
};
