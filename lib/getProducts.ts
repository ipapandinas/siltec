import { GRAPHQL_API_URL } from "#/utils/constants";
import { queryProducts, queryProduct } from "#/utils/queries";
import { IProduct } from "#/interfaces/IProduct";

export const getProducts = async (collection: string, typology: string) => {
  try {
    const query = queryProducts(collection, typology);
    return await fetch(GRAPHQL_API_URL, {
      cache: "no-store",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
      }),
    })
      .then((response) => response.json())
      .then((content: { data: { products: { data: IProduct[] } } }) => {
        return content.data.products.data;
      });
  } catch (err: any) {
    console.error(
      `Products could not have been fetched - Detail: ${
        err?.message ? err.message : JSON.stringify(err)
      }`
    );
  }
};

export const getProduct = async (id: string) => {
  try {
    const query = queryProduct(id);
    return await fetch(GRAPHQL_API_URL, {
      cache: "no-store",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
      }),
    })
      .then((response) => response.json())
      .then(
        (content: { data: { product: { data: IProduct } } }) =>
          content.data.product.data
      );
  } catch (err: any) {
    console.error(
      `Product could not have been fetched - Detail: ${
        err?.message ? err.message : JSON.stringify(err)
      }`
    );
    return null;
  }
};
