import request from "graphql-request";

import { GRAPHQL_API_URL } from "#/utils/constants";
import {
  queryProject,
  queryProjects,
  queryProjectSinglePage,
} from "#/utils/queries";
import { IProject, IProjectSinglePage } from "#/interfaces/IProject";

export const getProjects = async () => {
  try {
    const gql = queryProjects();
    return (
      await request<{ projects: { data: IProject[] } }>(GRAPHQL_API_URL, gql)
    ).projects.data;
  } catch (err: any) {
    console.error(
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
    console.error(
      `Project could not have been fetched - Detail: ${
        err?.message ? err.message : JSON.stringify(err)
      }`
    );
  }
};

export const getProjectSinglePage = async () => {
  try {
    const gql = queryProjectSinglePage();
    return (
      await request<{ hubDeRealisation: { data: IProjectSinglePage } }>(
        GRAPHQL_API_URL,
        gql
      )
    ).hubDeRealisation.data;
  } catch (err: any) {
    console.error(
      `Project single page could not have been fetched - Detail: ${
        err?.message ? err.message : JSON.stringify(err)
      }`
    );
  }
};
