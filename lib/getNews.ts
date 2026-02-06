import { cache } from "react";


import { GRAPHQL_API_URL, REVALIDATE_CONTENT } from "#/utils/constants";
import {
  queryNews,
  querySingleNews,
  queryNewsSinglePage,
} from "#/utils/queries";
import { INews, INewsSinglePage } from "#/interfaces/INews";

export const getNews = cache(async () => {
  try {
    const query = queryNews();
    return await fetch(GRAPHQL_API_URL, {
      next: { revalidate: REVALIDATE_CONTENT },
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
      }),
    })
      .then((response) => response.json())
      .then(
        (content: { data: { news: { data: INews[] } } }) =>
          content.data.news.data
      );
  } catch (err: any) {
    console.error(
      `News could not have been fetched - Detail: ${
        err?.message ? err.message : JSON.stringify(err)
      }`
    );
  }
});

export const getSingleNews = cache(async (slug: string) => {
  try {
    const query = querySingleNews(slug);
    return await fetch(GRAPHQL_API_URL, {
      next: { revalidate: REVALIDATE_CONTENT },
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
      }),
    })
      .then((response) => response.json())
      .then(
        (content: { data: { news: { data: INews[] } } }) =>
          content.data.news.data[0] ?? null
      );
  } catch (err: any) {
    console.error(
      `Single news could not have been fetched - Detail: ${
        err?.message ? err.message : JSON.stringify(err)
      }`
    );
  }
});

export const getNewsSinglePage = cache(async () => {
  try {
    const query = queryNewsSinglePage();
    const response = await fetch(GRAPHQL_API_URL, {
      next: { revalidate: REVALIDATE_CONTENT },
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
      }),
    });
    const content: { data: { hubDActualite: { data: INewsSinglePage } } } =
      await response.json();
    return content.data.hubDActualite.data;
  } catch (err: any) {
    console.error(
      `News single page could not have been fetched - Detail: ${
        err?.message ? err.message : JSON.stringify(err)
      }`
    );
  }
});
