import { GRAPHQL_API_URL } from "#/utils/constants";
import { queryCollections, queryCollectionSinglePage } from "#/utils/queries";
import { ICollection, ICollectionSinglePage } from "#/interfaces/ICollection";

export const getCollections = async () => {
  try {
    const query = queryCollections();
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
};

export const getCollectionSinglePage = async () => {
  try {
    const query = queryCollectionSinglePage();
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
};
