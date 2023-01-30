import request from "graphql-request";

import { GRAPHQL_API_URL } from "#/utils/constants";
import { queryProject, queryProjects } from "#/utils/queries";
import { IProject } from "#/interfaces/IProject";

export const getProjects = async () => {
  try {
    const gql = queryProjects();
    return (
      await request<{ projects: { data: IProject[] } }>(GRAPHQL_API_URL, gql)
    ).projects.data;
  } catch (err: any) {
    throw new Error(
      `Projects could not have been fetched - Detail: ${
        err?.message ? err.message : JSON.stringify(err)
      }`
    );
  }
};

export const getProject = async (id: string) => {
  try {
    const gql = queryProject(id);
    return (
      await request<{ project: { data: IProject } }>(GRAPHQL_API_URL, gql)
    ).project.data;
  } catch (err: any) {
    throw new Error(
      `Project could not have been fetched - Detail: ${
        err?.message ? err.message : JSON.stringify(err)
      }`
    );
  }
};
