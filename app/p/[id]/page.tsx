import { getProduct } from "#/lib/getProducts";
import Product from "#/ui/Product";

export default async function Page({ params }: any) {
  const { id } = params;
  const product = await getProduct(id);

  if (!product) return null; //todo: 404

  return <Product product={product} />;
}
