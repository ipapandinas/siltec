import request from "graphql-request";

import { GRAPHQL_API_URL } from "#/utils/constants";
import { queryAllBrands, queryFeaturedBrands } from "#/utils/queries";
import { IBrand } from "#/interfaces/IBrand";

export const getAllBrands = async () => {
  try {
    const gql = queryAllBrands();
    return (await request<{ brands: { data: IBrand[] } }>(GRAPHQL_API_URL, gql))
      .brands.data;
  } catch (err: any) {
    throw new Error(
      `Brands could not have been fetched - Detail: ${
        err?.message ? err.message : JSON.stringify(err)
      }`
    );
  }
};

export const getFeaturedBrands = async () => {
  try {
    const gql = queryFeaturedBrands();
    return (await request<{ brands: { data: IBrand[] } }>(GRAPHQL_API_URL, gql))
      .brands.data;
  } catch (err: any) {
    throw new Error(
      `Featured brands could not have been fetched - Detail: ${
        err?.message ? err.message : JSON.stringify(err)
      }`
    );
  }
};
