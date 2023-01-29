import { getTypologies } from "#/lib/getTypologies";
import Band from "#/ui/Band";
import Explore from "#/ui/Explore";
import { COLOR_SECONDARY_MAIN } from "#/utils/constants";

import styles from "../../page.module.css";

export default async function Page({ params }: any) {
  const { collectionSlug } = params;
  const typologies = await getTypologies(collectionSlug);

  return (
    <main className={styles.explore}>
      <div className={styles.section}>
        <Band color={COLOR_SECONDARY_MAIN} text={collectionSlug} />
      </div>
      <div className={styles.section}>
        <Explore items={typologies} subPath={`c/${collectionSlug}`} />
      </div>
    </main>
  );
}
