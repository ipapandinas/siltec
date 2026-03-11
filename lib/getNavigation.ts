import { cache } from "react";

import { GRAPHQL_API_URL, REVALIDATE_STATIC } from "#/utils/constants";
import { queryNavigation } from "#/utils/queries";
import type { PastilleType } from "#/interfaces/INavigation";
import { DEFAULT_NAVIGATION } from "#/utils/constants";

export const getNavigation = cache(async () => {
  try {
    const response = await fetch(GRAPHQL_API_URL, {
      next: { revalidate: REVALIDATE_STATIC },
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: queryNavigation() }),
    });

    const json = await response.json();

    const apiPastille = json?.data?.navigation?.pastille ?? [];

    if (apiPastille.length === 0) return DEFAULT_NAVIGATION;

    return mergeNavigationWithDefaultPictos(apiPastille);
  } catch (err: any) {
    console.error("Navigation fetch failed:", err);
    return DEFAULT_NAVIGATION;
  }
});

export function mergeNavigationWithDefaultPictos(
    apiNav: PastilleType[]
): PastilleType[] {
  const defaultByUrl = new Map(
      DEFAULT_NAVIGATION.map((item) => [item.url, item])
  );

  return apiNav.map((item) => {
    // If API already has a picto, keep it
    if (item.picto?.url) return item;

    const fallback = defaultByUrl.get(item.url);

    // No fallback found → return item as-is
    if (!fallback?.picto?.url) return item;

    return {
      ...item,
      picto: fallback.picto,
    };
  });
}
