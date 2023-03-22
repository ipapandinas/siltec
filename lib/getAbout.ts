import { cache } from "react";

import { GRAPHQL_API_URL } from "#/utils/constants";
import { queryAboutSinglePage } from "#/utils/queries";
import { IAboutSinglePage } from "#/interfaces/IAbout";

export const getAboutSinglePage = cache(async () => {
  try {
    const query = queryAboutSinglePage();
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
        (content: { data: { quiSommesNous: { data: IAboutSinglePage } } }) =>
          content.data.quiSommesNous.data
      );
  } catch (err: any) {
    console.error(
      `About single page could not have been fetched - Detail: ${
        err?.message ? err.message : JSON.stringify(err)
      }`
    );
  }
});
