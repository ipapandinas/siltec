import { cache } from "react";

import { GRAPHQL_API_URL } from "#/utils/constants";
import { queryNavigation } from "#/utils/queries";
import { INavigation } from "#/interfaces/INavigation";

export const getNavigation = cache(async () => {
  try {
    const query = queryNavigation();
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
        (content: { data: { navigation: { data: INavigation } } }) =>
          content.data.navigation.data
      );
  } catch (err: any) {
    console.error(
      `Navigation could not have been fetched - Detail: ${
        err?.message ? err.message : JSON.stringify(err)
      }`
    );
  }
});
