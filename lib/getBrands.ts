import { cache } from "react";

import { GRAPHQL_API_URL } from "#/utils/constants";
import { queryAllBrands, queryFeaturedBrands } from "#/utils/queries";
import { IBrand } from "#/interfaces/IBrand";

export const getAllBrands = cache(async () => {
  try {
    const query = queryAllBrands();
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
        (content: { data: { brands: { data: IBrand[] } } }) =>
          content.data.brands.data
      );
  } catch (err: any) {
    console.error(
      `Brands could not have been fetched - Detail: ${
        err?.message ? err.message : JSON.stringify(err)
      }`
    );
  }
});

export const getFeaturedBrands = cache(async () => {
  try {
    const query = queryFeaturedBrands();
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
        (content: { data: { brands: { data: IBrand[] } } }) =>
          content.data.brands.data
      );
  } catch (err: any) {
    console.error(
      `Featured brands could not have been fetched - Detail: ${
        err?.message ? err.message : JSON.stringify(err)
      }`
    );
  }
});
