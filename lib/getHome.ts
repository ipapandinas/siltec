import { cache } from "react";

import { IBrand } from "#/interfaces/IBrand";
import { ICollection } from "#/interfaces/ICollection";
import { IImage } from "#/interfaces/IImage";
import { IProject } from "#/interfaces/IProject";
import { GRAPHQL_API_URL, REVALIDATE_HOME } from "#/utils/constants";
import { queryHome } from "#/utils/queries";

type HomepageConfig = {
  couleurFondPartenaires?: string | null;
  couleurFondArflex?: string | null;
  couleurBoutonArflex?: string | null;
  couleurTexteArflex?: string | null;
  couleurBoutonVoirPlus?: string | null;
};

type HomeContent = {
  brands: IBrand[];
  carroussel: {
    documentId: string;
    medias: IImage[];
  };
  collections: ICollection[];
  homepage?: HomepageConfig | null;
  projects: IProject[];
};

export const getHome = cache(async () => {
  try {
    const query = queryHome();

    return await fetch(GRAPHQL_API_URL, {
      next: { revalidate: REVALIDATE_HOME },
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
      }),
    })
      .then((response) => response.json())
      .then((content: { data?: HomeContent; errors?: Array<{ message?: string }> }) => {
        if (content.errors !== undefined && content.errors.length > 0) {
          throw new Error(
            `GraphQL errors: ${content.errors
              .map(({ message }) => message || "Unknown GraphQL error")
              .join(" | ")}`
          );
        }

        return content.data;
      });
  } catch (err: any) {
    console.error(
      `Home content could not have been fetched - Detail: ${
        err?.message ? err.message : JSON.stringify(err)
      }`
    );
  }
});
