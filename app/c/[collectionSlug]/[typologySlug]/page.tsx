import { getProducts } from "#/lib/getProducts";
import Band from "#/ui/Band";
import Explore from "#/ui/Explore";
import { COLOR_SECONDARY_MAIN } from "#/utils/constants";

import styles from "../../../page.module.css";

export default async function Page({ params }: any) {
  const { collectionSlug, typologySlug } = params;
  const products = await getProducts(collectionSlug, typologySlug);

  return (
    <main className={styles.explore}>
      <div className={styles.section}>
        <Band color={COLOR_SECONDARY_MAIN} text={typologySlug} />
      </div>
      <div className={styles.section}>
        <Explore items={products} subPath="p" />
      </div>
    </main>
  );
}
