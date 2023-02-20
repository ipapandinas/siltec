import Container from "#/ui/Container";
import SinglePageHeader from "#/ui/SinglePageHeader";
import Content from "./content";

export default async function Contact() {
  return (
    <div>
      <Container id="lastContainer">
        <SinglePageHeader color="#C9F5F0" title="Contact" />
        <div style={{ marginTop: "8rem" }}>
          <Content />
        </div>
      </Container>
    </div>
  );
}
