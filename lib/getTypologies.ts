import request from "graphql-request";

import { GRAPHQL_API_URL } from "#/utils/constants";
import { queryTypologies } from "#/utils/queries";
import { ITypoligy } from "#/interfaces/ITypology";

export const getTypologies = async (collection: string) => {
  try {
    const gql = queryTypologies(collection);
    return (
      await request<{ typologies: { data: ITypoligy[] } }>(GRAPHQL_API_URL, gql)
    ).typologies.data;
  } catch (err: any) {
    throw new Error(
      `Typologies could not have been fetched - Detail: ${
        err?.message ? err.message : JSON.stringify(err)
      }`
    );
  }
};
