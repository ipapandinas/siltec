import { getProduct } from "#/lib/getProducts";
import Band from "#/ui/Band";
import Breadcrumbs from "#/ui/Breadcrumbs";
import Container from "#/ui/Container";
import Product from "#/ui/Product";
import { COLOR_SECONDARY_MAIN } from "#/utils/constants";

export default async function Page({ params }: any) {
  const { id } = params;
  const product = await getProduct(id);

  if (!product) return null; //todo: 404

  const titre = product.attributes.titre;
  const marque = product.attributes.marque;
  const pageName = titre + `${marque ? ` - ${marque}` : ""}`;
  const { titre: collectionTitle, slug: collectionSlug } =
    product.attributes.collection.data?.attributes ?? {};
  const { titre: typologyTitle, slug: typologySlug } =
    product.attributes.typology.data?.attributes ?? {};

  return (
    <div>
      <Container>
        <Band color={COLOR_SECONDARY_MAIN} text={pageName} />
        <div style={{ marginTop: "4rem" }}>
          <Breadcrumbs
            list={[
              { name: "Collections", href: "/collections" },
              {
                name: collectionTitle,
                href: `/c/${collectionSlug}`,
              },
              {
                name: typologyTitle,
                href: `/c/${collectionSlug}/${typologySlug}`,
              },
            ]}
            pageName={pageName}
          />
        </div>
      </Container>
      <Container>
        <Product product={product} />
      </Container>
    </div>
  );
}
