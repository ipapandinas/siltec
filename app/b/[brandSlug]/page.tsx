import { notFound } from "next/navigation";

import { getBrandBySlug } from "#/lib/getBrands";
import { getCollections } from "#/lib/getCollections";
import { getHome } from "#/lib/getHome";
import { getProductsByBrand } from "#/lib/getProducts";
import Band from "#/ui/Band";
import Breadcrumbs from "#/ui/Breadcrumbs";
import Container from "#/ui/Container";
import { COLOR_SECONDARY_MAIN } from "#/utils/constants";

import Content from "./content";

export default async function Page({
  params,
}: {
  params: Promise<{ brandSlug: string }>;
}) {
  const { brandSlug } = await params;
  const [brand, home, products, collections] = await Promise.all([
    getBrandBySlug(brandSlug),
    getHome(),
    getProductsByBrand(brandSlug),
    getCollections(),
  ]);

  if (!brand) notFound();
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
          <Content products={products ?? []} collections={collections ?? []} />
        </div>
      </Container>
    </div>
  );
}
