import BrandsSection from "#/ui/BrandsSection";
import Carrousel from "#/ui/Carroussel";
import CollectionsSection from "#/ui/CollectionsSection";
import Container from "#/ui/Container";
import FeaturedBrand from "#/ui/FeaturedBrand";
import RoundWrapper from "#/ui/RoundWrapper";
import ProjectsSection from "#/ui/ProjectsSection";
import Section from "#/ui/Section";

const CARROUSEL_IMAGES = [
  "/assets/carroussel/arflex.png",
  "/assets/carroussel/tropico.png",
  "/assets/carroussel/tokio.png",
];

export default function Home() {
  return (
    <>
      <Carrousel list={CARROUSEL_IMAGES} />

      <Container bgcolor="secondary.light" bgcolorSize="lg">
        <FeaturedBrand
          bgcolor="secondary.light"
          href="https://www.arflex.it/"
          logoSrc="/assets/brands/arflex.png"
          name="Arflex"
        />
      </Container>

      <Section>
        {/* @ts-expect-error Server Component */}
        <CollectionsSection />
      </Section>

      <Section
        title="Nos réalisations"
        description="Hôtel à Courchevel ou sur une plage de Corse, espaces lounge d'aéroport, boutiques de joaillers, bureaux d'une tour de la Défense ou appartement privé, découvrez une sélection parmi nos réalisations."
        href="/projects"
        sx={{ dipslay: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {/* @ts-expect-error Server Component */}
        <ProjectsSection />
      </Section>
      <Section
        title="Nos marques"
        // loadMore={() => {
        //   console.log("todo");
        // }}
      >
        <RoundWrapper bgcolor="background.default">
          {/* @ts-expect-error Server Component */}
          <BrandsSection />
        </RoundWrapper>
      </Section>
    </>
  );
}
