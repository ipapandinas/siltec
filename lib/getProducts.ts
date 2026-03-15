import { cache } from "react";

import { IProduct } from "#/interfaces/IProduct";
import { GRAPHQL_API_URL, REVALIDATE_CONTENT } from "#/utils/constants";
import { queryProduct, queryProducts, queryProductsByBrandSlug } from "#/utils/queries";

type GraphqlProductsResponse<TProduct> = {
  data?: { products?: TProduct[] };
  errors?: Array<{ message?: string }>;
};

type ProductQueryResult = Omit<IProduct, "image">;

function withFallbackImage(product: ProductQueryResult): IProduct {
  return {
    ...product,
    image: product.medias?.[0] ?? null,
  };
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
      .then((content: GraphqlProductsResponse<ProductQueryResult>) =>
        extractProducts(content).map(withFallbackImage)
      );
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
      .then((content: GraphqlProductsResponse<ProductQueryResult>) => extractProducts(content));

    return products.map(withFallbackImage);
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
      .then((content: GraphqlProductsResponse<ProductQueryResult>) => {
        const product = extractProducts(content)[0];
        return product ? withFallbackImage(product) : null;
      });
  } catch (err: any) {
    console.error(
      `Product could not have been fetched - Detail: ${
        err?.message ? err.message : JSON.stringify(err)
      }`
    );
    return null;
  }
});
