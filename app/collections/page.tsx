import { getCollections } from "#/lib/getCollections";
import Band from "#/ui/Band";
import Explore from "#/ui/Explore";
import { COLOR_SECONDARY_MAIN } from "#/utils/constants";

import styles from "../page.module.css";

export default async function Collections() {
  const collections = await getCollections();

  return (
    <main className={styles.main}>
      <div className={styles.section}>
        <Band
          color={COLOR_SECONDARY_MAIN}
          text="Notre sélection de produits au sein d'une offre beaucoup plus vaste."
        />
      </div>
      <div className={styles.section}>
        <Explore items={collections} subPath="c" />
      </div>
    </main>
  );
}
