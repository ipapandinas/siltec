import { getFeaturedBrands } from "#/lib/getBrands";
import BrandsGrid from "./BrandsGrid";

export default async function BrandsSection() {
  const brands = await getFeaturedBrands();

  if (!brands) return null; //todo: 404

  return <BrandsGrid list={brands.slice(0, 8)} />;
}
