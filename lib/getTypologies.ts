import { GRAPHQL_API_URL } from "#/utils/constants";
import { queryTypologies, queryTypologyTitle } from "#/utils/queries";
import { ITypology } from "#/interfaces/ITypology";

export const getTypologies = async (collection: string) => {
  try {
    const query = queryTypologies(collection);
    return await fetch(GRAPHQL_API_URL, {
      next: { revalidate: 60 },
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
      }),
    })
      .then((response) => response.json())
      .then(
        (content: { data: { typologies: { data: ITypology[] } } }) =>
          content.data.typologies.data
      );
  } catch (err: any) {
    console.error(
      `Typologies could not have been fetched - Detail: ${
        err?.message ? err.message : JSON.stringify(err)
      }`
    );
  }
};

export const getTypologyTitle = async (slug: string) => {
  try {
    const query = queryTypologyTitle(slug);
    return await fetch(GRAPHQL_API_URL, {
      next: { revalidate: 60 },
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
      }),
    })
      .then((response) => response.json())
      .then((content: { data: { typologies: { data: ITypology[] } } }) => {
        const typologies = content.data.typologies.data;
        if (typologies.length > 0) return typologies[0].attributes.titre;
        return undefined;
      });
  } catch (err: any) {
    console.error(
      `Typology title could not have been fetched - Detail: ${
        err?.message ? err.message : JSON.stringify(err)
      }`
    );
  }
};
