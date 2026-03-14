import { cache } from "react";

import { IProduct } from "#/interfaces/IProduct";
import { GRAPHQL_API_URL, REVALIDATE_CONTENT } from "#/utils/constants";
import {
  queryProduct,
  queryProductImage,
  queryProducts,
  queryProductsByBrandSlug,
} from "#/utils/queries";

type GraphqlProductsResponse<TProduct> = {
  data?: { products?: TProduct[] };
  errors?: Array<{ message?: string }>;
};

type ProductImageNode = {
  documentId: string;
  slug: string;
  image: IProduct["image"];
};

async function getProductImageBySlug(slug: string) {
  const query = queryProductImage(slug);

  const response = await fetch(GRAPHQL_API_URL, {
    next: { revalidate: REVALIDATE_CONTENT },
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  }).then((res) => res.json() as Promise<GraphqlProductsResponse<ProductImageNode>>);

  if (!response.data?.products || response.errors?.length) {
    return null;
  }

  return response.data.products[0]?.image ?? null;
}

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

    const productsWithImages = await Promise.all(
      products.map(async (product) => {
        const image = await getProductImageBySlug(product.slug);
        return { ...product, image: image ?? product.image ?? null };
      })
    );

    return productsWithImages;
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
