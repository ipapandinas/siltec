import request from "graphql-request";

import { GRAPHQL_API_URL } from "#/utils/constants";
import { queryCollections, queryCollectionSinglePage } from "#/utils/queries";
import { ICollection, ICollectionSinglePage } from "#/interfaces/ICollection";

export const getCollections = async () => {
  try {
    const gql = queryCollections();
    return (
      await request<{ collections: { data: ICollection[] } }>(
        GRAPHQL_API_URL,
        gql
      )
    ).collections.data;
  } catch (err: any) {
    console.error(
      `Collections could not have been fetched - Detail: ${
        err?.message ? err.message : JSON.stringify(err)
      }`
    );
  }
};

export const getCollectionSinglePage = async () => {
  try {
    const gql = queryCollectionSinglePage();
    return (
      await request<{ hubDeCollection: { data: ICollectionSinglePage } }>(
        GRAPHQL_API_URL,
        gql
      )
    ).hubDeCollection.data;
  } catch (err: any) {
    console.error(
      `Collection single page could not have been fetched - Detail: ${
        err?.message ? err.message : JSON.stringify(err)
      }`
    );
  }
};
