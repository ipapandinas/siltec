import { getProducts } from "#/lib/getProducts";
import Band from "#/ui/Band";
import Container from "#/ui/Container";
import Explore from "#/ui/Explore";
import { COLOR_SECONDARY_MAIN } from "#/utils/constants";

export default async function Page({ params }: any) {
  const { collectionSlug, typologySlug } = params;
  const products = await getProducts(collectionSlug, typologySlug);

  return (
    <div>
      <Container>
        <Band color={COLOR_SECONDARY_MAIN} text={typologySlug} />
      </Container>
      <Container>
        <Explore items={products} subPath="p" />
      </Container>
    </div>
  );
}
