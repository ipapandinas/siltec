import request from "graphql-request";

import { GRAPHQL_API_URL } from "#/utils/constants";
import { queryProducts, queryProduct } from "#/utils/queries";
import { IProduct } from "#/interfaces/IProduct";

export const getProducts = async (collection: string, typology: string) => {
  try {
    const gql = queryProducts(collection, typology);
    return (
      await request<{ products: { data: IProduct[] } }>(GRAPHQL_API_URL, gql)
    ).products.data;
  } catch (err: any) {
    throw new Error(
      `Products could not have been fetched - Detail: ${
        err?.message ? err.message : JSON.stringify(err)
      }`
    );
  }
};

export const getProduct = async (id: string) => {
  try {
    const gql = queryProduct(id);
    return (
      await request<{ product: { data: IProduct } }>(GRAPHQL_API_URL, gql)
    ).product.data;
  } catch (err: any) {
    throw new Error(
      `Product could not have been fetched - Detail: ${
        err?.message ? err.message : JSON.stringify(err)
      }`
    );
  }
};
