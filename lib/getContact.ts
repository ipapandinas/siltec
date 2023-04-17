import { cache } from "react";

import { GRAPHQL_API_URL } from "#/utils/constants";
import { queryContactSinglePage } from "#/utils/queries";
import { IContactSinglePage } from "#/interfaces/IContact";

export const getContactSinglePage = cache(async () => {
  try {
    const query = queryContactSinglePage();
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
        (content: { data: { contact: { data: IContactSinglePage } } }) =>
          content.data.contact.data
      );
  } catch (err: any) {
    console.error(
      `Contact single page could not have been fetched - Detail: ${
        err?.message ? err.message : JSON.stringify(err)
      }`
    );
  }
});
