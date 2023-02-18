import Container from "#/ui/Container";
import SinglePageHeader from "#/ui/SinglePageHeader";
import Content from "./content";

export default async function Contact() {
  return (
    <div>
      <Container>
        <SinglePageHeader color="#C9F5F0" title="Contact" />
      </Container>
      <Container id="lastContainer">
        <Content />
      </Container>
    </div>
  );
}
