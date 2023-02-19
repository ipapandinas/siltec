import { IBrand } from "#/interfaces/IBrand";
import BrandsGrid from "./BrandsGrid";

export default function BrandsSection({ brands }: { brands: IBrand[] }) {
  return <BrandsGrid list={brands} />;
}
