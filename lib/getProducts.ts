import { cache } from "react";

import { IProduct } from "#/interfaces/IProduct";
import { GRAPHQL_API_URL, REVALIDATE_CONTENT } from "#/utils/constants";
import {
  queryProduct,
  queryProducts,
  queryProductsByBrandSlug,
  queryProductsForBrandFallback,
} from "#/utils/queries";

type GraphqlProductsResponse<TProduct> = {
  data?: { products?: TProduct[] };
  errors?: Array<{ message?: string }>;
};

function extractProducts<TProduct>(content: GraphqlProductsResponse<TProduct>): TProduct[] {
  if (content.errors?.length) {
    throw new Error(
      `GraphQL errors: ${content.errors
        .map(({ message }) => message || "Unknown GraphQL error")
        .join(" | ")}`
    );
  }

  return content.data?.products ?? [];
}

export const getProducts = cache(async (collection: string, typology: string) => {
  try {
    const query = queryProducts(collection, typology);
    return await fetch(GRAPHQL_API_URL, {
      next: { revalidate: REVALIDATE_CONTENT },
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    })
      .then((response) => response.json())
      .then((content: GraphqlProductsResponse<IProduct>) => extractProducts(content));
  } catch (err: any) {
    console.error(
      `Products could not have been fetched - Detail: ${
        err?.message ? err.message : JSON.stringify(err)
      }`
    );

    return [];
  }
});

export const getProductsByBrand = cache(async (brandSlug: string) => {
  try {
    const query = queryProductsByBrandSlug(brandSlug);

    const products = await fetch(GRAPHQL_API_URL, {
      next: { revalidate: REVALIDATE_CONTENT },
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    })
      .then((response) => response.json())
      .then((content: GraphqlProductsResponse<IProduct>) => extractProducts(content));

    if (products.length > 0) return products;

    const fallbackQuery = queryProductsForBrandFallback();

    const fallbackProducts = await fetch(GRAPHQL_API_URL, {
      next: { revalidate: REVALIDATE_CONTENT },
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: fallbackQuery }),
    })
      .then((response) => response.json())
      .then((content: GraphqlProductsResponse<IProduct>) => extractProducts(content));

    const normalizedBrandSlug = brandSlug.trim().toLowerCase();

    return fallbackProducts.filter(
      (product) => product?.marque?.slug?.trim()?.toLowerCase() === normalizedBrandSlug
    );
  } catch (err: any) {
    console.error(
      `Products by brand could not have been fetched - Detail: ${
        err?.message ? err.message : JSON.stringify(err)
      }`
    );

    return [];
  }
});

export const getProduct = cache(async (slug: string) => {
  try {
    const query = queryProduct(slug);
    return await fetch(GRAPHQL_API_URL, {
      next: { revalidate: REVALIDATE_CONTENT },
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    })
      .then((response) => response.json())
      .then((content: GraphqlProductsResponse<IProduct>) => extractProducts(content)[0] ?? null);
  } catch (err: any) {
    console.error(
      `Product could not have been fetched - Detail: ${
        err?.message ? err.message : JSON.stringify(err)
      }`
    );
    return null;
  }
});
