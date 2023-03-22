import { notFound } from "next/navigation";

import { getAllBrands } from "#/lib/getBrands";
import Container from "#/ui/Container";
import SinglePageHeader from "#/ui/SinglePageHeader";
import Content from "./content";

export default async function Brands() {
  const brands = await getAllBrands();

  if (!brands) notFound();

  return (
    <div>
      <Container>
        <SinglePageHeader color="#FEDB55" title="Nos marques" />
      </Container>
      <Container id="lastContainer">
        <Content brands={brands} />
      </Container>
    </div>
  );
}
