import BrandsSection from "#/ui/BrandsSection";
import Carrousel from "#/ui/Carroussel";
import CollectionsSection from "#/ui/CollectionsSection";
import Container from "#/ui/Container";
import FeaturedBrand from "#/ui/FeaturedBrand";
import ProjectsSection from "#/ui/ProjectsSection";
import RoundWrapper from "#/ui/RoundWrapper";
import ScrollDown from "#/ui/ScrollDown";
import Section from "#/ui/Section";
import SiltecChip from "#/ui/SiltecChip";

const CARROUSEL_IMAGES = [
  "/assets/carroussel/arflex.png",
  "/assets/carroussel/tropico.png",
  "/assets/carroussel/tokio.png",
];

export default function Home() {
  return (
    <>
      <SiltecChip />
      <Carrousel list={CARROUSEL_IMAGES} />
      <ScrollDown />

      <Container
        bgcolor="secondary.light"
        bgcolorSize="lg"
        id="firstContainer"
        sx={{ maxWidth: "1100px" }}
      >
        <FeaturedBrand
          bgcolor="secondary.light"
          href="https://www.arflex.it/"
          logoSrc="/assets/brands/arflex.svg"
          name="Arflex"
        />
      </Container>

      <Section>
        <div>
          {/* @ts-expect-error Server Component */}
          <CollectionsSection />
        </div>
      </Section>

      <Section
        title="Nos réalisations"
        description="Hôtel à Courchevel ou sur une plage de Corse, espaces lounge d'aéroport, boutiques de joaillers, bureaux d'une tour de la Défense ou appartement privé, découvrez une sélection parmi nos réalisations."
        href="/projects"
        sx={{ dipslay: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <div>
          {/* @ts-expect-error Server Component */}
          <ProjectsSection />
        </div>
      </Section>
      <Section
        containerId="lastContainer"
        title="Nos marques"
        // loadMore={() => {
        //   console.log("todo");
        // }}
      >
        <RoundWrapper bgcolor="background.default">
          <div style={{ width: "100%" }}>
            {/* @ts-expect-error Server Component */}
            <BrandsSection />
          </div>
        </RoundWrapper>
      </Section>
    </>
  );
}
