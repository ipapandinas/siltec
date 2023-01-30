import request from "graphql-request";

import { GRAPHQL_API_URL } from "#/utils/constants";
import { queryNews, querySingleNews } from "#/utils/queries";
import { INews } from "#/interfaces/INews";

export const getNews = async () => {
  try {
    const gql = queryNews();
    return (await request<{ news: { data: INews[] } }>(GRAPHQL_API_URL, gql))
      .news.data;
  } catch (err: any) {
    throw new Error(
      `News could not have been fetched - Detail: ${
        err?.message ? err.message : JSON.stringify(err)
      }`
    );
  }
};

export const getSingleNews = async (id: string) => {
  try {
    const gql = querySingleNews(id);
    return (await request<{ new: { data: INews } }>(GRAPHQL_API_URL, gql)).new
      .data;
  } catch (err: any) {
    throw new Error(
      `Single news could not have been fetched - Detail: ${
        err?.message ? err.message : JSON.stringify(err)
      }`
    );
  }
};
