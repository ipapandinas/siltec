import { cache } from "react";

import { GRAPHQL_API_URL, REVALIDATE_STATIC } from "#/utils/constants";
import { queryContactSinglePage } from "#/utils/queries";
import { IContactSinglePage } from "#/interfaces/IContact";

export const getContactSinglePage = cache(async () => {
  try {
    const query = queryContactSinglePage();
    return await fetch(GRAPHQL_API_URL, {
      next: { revalidate: REVALIDATE_STATIC },
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
      }),
    })
      .then((response) => response.json())
      .then(
        (content: { data: { contact: IContactSinglePage } }) =>
          content.data.contact
      );
  } catch (err: any) {
    console.error(
      `Contact single page could not have been fetched - Detail: ${
        err?.message ? err.message : JSON.stringify(err)
      }`
    );
  }
});
