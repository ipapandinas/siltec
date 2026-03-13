import { notFound } from "next/navigation";

import { getBrandBySlug } from "#/lib/getBrands";
import { getHome } from "#/lib/getHome";
import { getProductsByBrand } from "#/lib/getProducts";
import Band from "#/ui/Band";
import Breadcrumbs from "#/ui/Breadcrumbs";
import Container from "#/ui/Container";
import { COLOR_SECONDARY_MAIN } from "#/utils/constants";
import { resolveImageUrl } from "#/utils/media";

import Content from "./content";

export default async function Page({
  params,
}: {
  params: Promise<{ brandSlug: string }>;
}) {
  const { brandSlug } = await params;
  const brand = await getBrandBySlug(brandSlug);
  const home = await getHome();

  if (!brand) notFound();

  const products = await getProductsByBrand(brandSlug);
  const bannerUrl = resolveImageUrl(brand.banner);
  const bandColor = home?.homepage?.couleurFondPartenaires ?? COLOR_SECONDARY_MAIN;

  return (
    <div>
      <Container id="lastContainer">
        <Band text={brand.nom} color={bandColor} />
        <div style={{ marginTop: "4rem" }}>
          <Breadcrumbs
            list={[{ name: "Marques", href: "/brands" }]}
            pageName={brand.nom}
          />
        </div>
        <div style={{ marginTop: "6rem" }}>
          <Content brand={brand} bannerUrl={bannerUrl} products={products ?? []} />
        </div>
      </Container>
    </div>
  );
}
