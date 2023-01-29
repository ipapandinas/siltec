import request from "graphql-request";

import { GRAPHQL_API_URL } from "#/utils/constants";
import { queryCollections } from "#/utils/queries";
import { ICollection } from "#/interfaces/ICollection";

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
    throw new Error(
      `Collections could not have been fetched - Detail: ${
        err?.message ? err.message : JSON.stringify(err)
      }`
    );
  }
};
