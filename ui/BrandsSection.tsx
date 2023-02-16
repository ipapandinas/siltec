import { getFeaturedBrands } from "#/lib/getBrands";
import BrandsGrid from "./BrandsGrid";

export default async function BrandsSection() {
  const brands = await getFeaturedBrands();

  return <BrandsGrid list={brands.slice(0, 8)} />;
}
