import { cache } from "react";

import { IBrand } from "#/interfaces/IBrand";
import { GRAPHQL_API_URL, REVALIDATE_SLOW } from "#/utils/constants";
import {
  queryAllBrands,
  queryBrandBySlug,
  queryFeaturedBrands,
} from "#/utils/queries";

type BrandsResponse = { data?: { brands?: IBrand[] }; errors?: Array<{ message?: string }> };

function extractBrands(content: BrandsResponse): IBrand[] {
  if (content.errors?.length) {
    throw new Error(
      `GraphQL errors: ${content.errors
        .map(({ message }) => message || "Unknown GraphQL error")
        .join(" | ")}`
    );
  }

  return content.data?.brands ?? [];
}

export const getAllBrands = cache(async () => {
  try {
    const query = queryAllBrands();
    return await fetch(GRAPHQL_API_URL, {
      next: { revalidate: REVALIDATE_SLOW },
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    })
      .then((response) => response.json())
      .then((content: BrandsResponse) => extractBrands(content));
  } catch (err: any) {
    console.error(
      `Brands could not have been fetched - Detail: ${
        err?.message ? err.message : JSON.stringify(err)
      }`
    );

    return [];
  }
});

export const getFeaturedBrands = cache(async () => {
  try {
    const query = queryFeaturedBrands();
    return await fetch(GRAPHQL_API_URL, {
      next: { revalidate: REVALIDATE_SLOW },
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    })
      .then((response) => response.json())
      .then((content: BrandsResponse) => extractBrands(content));
  } catch (err: any) {
    console.error(
      `Featured brands could not have been fetched - Detail: ${
        err?.message ? err.message : JSON.stringify(err)
      }`
    );

    return [];
  }
});

export const getBrandBySlug = cache(async (slug: string) => {
  try {
    const query = queryBrandBySlug(slug);
    return await fetch(GRAPHQL_API_URL, {
      next: { revalidate: REVALIDATE_SLOW },
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    })
      .then((response) => response.json())
      .then((content: BrandsResponse) => extractBrands(content)[0] ?? null);
  } catch (err: any) {
    console.error(
      `Brand could not have been fetched - Detail: ${
        err?.message ? err.message : JSON.stringify(err)
      }`
    );

    return null;
  }
});
