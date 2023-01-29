import CollectionsSection from "#/ui/CollectionsSection";
import Arflex from "#/ui/Arflex";
import Carrousel from "#/ui/Carroussel";

import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Carrousel />
      <div className={styles.section}>
        <Arflex />
      </div>
      <div className={styles.section}>
        {/* @ts-expect-error Server Component */}
        <CollectionsSection />
      </div>
    </main>
  );
}
