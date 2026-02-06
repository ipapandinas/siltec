import { cache } from "react";

import { GRAPHQL_API_URL, REVALIDATE_SLOW } from "#/utils/constants";
import {
  queryCollections,
  queryCollectionSinglePage,
  queryCollectionTitle,
} from "#/utils/queries";
import { ICollection, ICollectionSinglePage } from "#/interfaces/ICollection";

export const getCollections = cache(async () => {
  try {
    const query = queryCollections();
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
        (content: { data: { collections: { data: ICollection[] } } }) =>
          content.data.collections.data
      );
  } catch (err: any) {
    console.error(
      `Collections could not have been fetched - Detail: ${
        err?.message ? err.message : JSON.stringify(err)
      }`
    );
  }
});

export const getCollectionSinglePage = cache(async () => {
  try {
    const query = queryCollectionSinglePage();
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
          data: { hubDeCollection: { data: ICollectionSinglePage } };
        }) => content.data.hubDeCollection.data
      );
  } catch (err: any) {
    console.error(
      `Collection single page could not have been fetched - Detail: ${
        err?.message ? err.message : JSON.stringify(err)
      }`
    );
  }
});

export const getCollectionTitle = cache(async (slug: string) => {
  try {
    const query = queryCollectionTitle(slug);
    return await fetch(GRAPHQL_API_URL, {
      next: { revalidate: REVALIDATE_SLOW },
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
      }),
    })
      .then((response) => response.json())
      .then((content: { data: { collections: { data: ICollection[] } } }) => {
        const collections = content.data.collections.data;
        if (collections.length > 0) return collections[0].attributes.titre;
        return undefined;
      });
  } catch (err: any) {
    console.error(
      `Collections could not have been fetched - Detail: ${
        err?.message ? err.message : JSON.stringify(err)
      }`
    );
  }
});
