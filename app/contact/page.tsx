import { getContactSinglePage } from "#/lib/getContact";
import Container from "#/ui/Container";
import SinglePageHeader from "#/ui/SinglePageHeader";
import { notFound } from "next/navigation";
import Content from "./content";

export default async function Contact() {
  const pageData = await getContactSinglePage();

  if (!pageData) notFound();

  const { couleur, sousTitre, titre } = pageData;

  return (
    <div>
      <Container id="lastContainer" sx={{ overflowX: "clip" }}>
        <SinglePageHeader
          color={couleur}
          subtitle={sousTitre ?? ""}
          title={titre}
        />
        <div style={{ marginTop: "8rem" }}>
          <Content buttonColor={couleur} />
        </div>
      </Container>
    </div>
  );
}
