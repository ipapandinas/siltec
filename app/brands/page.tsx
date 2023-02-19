import { getAllBrands } from "#/lib/getBrands";
import Container from "#/ui/Container";
import SinglePageHeader from "#/ui/SinglePageHeader";
import Content from "./content";

export default async function Brands() {
  const brands = await getAllBrands();

  if (!brands) return null; //todo: 404

  return (
    <div>
      <Container>
        <SinglePageHeader color="#C9F5F0" title="Abécédaire de nos marques" />
      </Container>
      <Container id="lastContainer">
        <Content brands={brands} />
      </Container>
    </div>
  );
}
