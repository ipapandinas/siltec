import { getContactSinglePage } from "#/lib/getContact";
import Container from "#/ui/Container";
import SinglePageHeader from "#/ui/SinglePageHeader";
import { notFound } from "next/navigation";
import Content from "./content";

export default async function Contact() {
  const pageData = await getContactSinglePage();

  if (!pageData) notFound();

  const { couleur, sousTitre, titre } = pageData.attributes;

  return (
    <div>
      <Container id="lastContainer">
        <SinglePageHeader
          color={couleur}
          subtitle={sousTitre ?? ""}
          title={titre}
        />
        <div style={{ marginTop: "8rem" }}>
          <Content />
        </div>
      </Container>
    </div>
  );
}
