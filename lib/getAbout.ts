import request from "graphql-request";

import { GRAPHQL_API_URL } from "#/utils/constants";
import { queryAboutSinglePage } from "#/utils/queries";
import { IAboutSinglePage } from "#/interfaces/IAbout";

export const getAboutSinglePage = async () => {
  try {
    const gql = queryAboutSinglePage();
    return (
      await request<{ quiSommesNous: { data: IAboutSinglePage } }>(
        GRAPHQL_API_URL,
        gql
      )
    ).quiSommesNous.data;
  } catch (err: any) {
    console.error(
      `About single page could not have been fetched - Detail: ${
        err?.message ? err.message : JSON.stringify(err)
      }`
    );
  }
};
