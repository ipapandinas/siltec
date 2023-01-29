import { getProduct } from "#/lib/getProducts";
import Band from "#/ui/Band";
import Product from "#/ui/Product";

import styles from "../../page.module.css";

export default async function Page({ params }: any) {
  const { id } = params;
  const product = await getProduct(id);

  if (!product) return null; //todo: 404

  return (
    <main className={styles.main}>
      <div className={styles.section}>
        <Product product={product} />
      </div>
    </main>
  );
}
