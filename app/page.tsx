import { getHome } from "#/lib/getHome";
import BrandsSection from "#/ui/BrandsSection";
import Carroussel from "#/ui/Carroussel";
import CollectionsSection from "#/ui/CollectionsSection";
import Container from "#/ui/Container";
import FeaturedBrand from "#/ui/FeaturedBrand";
import ProjectsSection from "#/ui/ProjectsSection";
import RoundWrapper from "#/ui/RoundWrapper";
import ScrollDown from "#/ui/ScrollDown";
import Section from "#/ui/Section";
import SiltecChip from "#/ui/SiltecChip";
import { UP_SM } from "#/utils/constants";
import { resolveImageUrl } from "#/utils/media";

const isHexColor = (value: unknown): value is string =>
  typeof value === "string" &&
  /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);

export default async function Home() {
  const data = await getHome();
  const brands = data?.brands;
  const carroussel = data?.carroussel?.medias;
  const heroCarrousselList = (carroussel ?? [])
    .map((media) => resolveImageUrl(media))
    .filter((url): url is string => Boolean(url));
  const collections = data?.collections;
  const projects = data?.projects;
  const homepageConfig = data?.homepage;

  const brandsBgColorValue =
    homepageConfig?.couleurFondPartenaires;
  const featuredBrandBgColorValue =
    homepageConfig?.couleurFondArflex;
  const featuredBrandButtonColorValue =
    homepageConfig?.couleurBoutonArflex;
  const featuredBrandTextColorValue =
    homepageConfig?.couleurTexteArflex;
  const brandsVoirPlusButtonColorValue =
    homepageConfig?.couleurBoutonVoirPlus;

  const brandsBgColor = isHexColor(brandsBgColorValue)
    ? brandsBgColorValue
    : "background.default";

  const featuredBrandBgColor = isHexColor(featuredBrandBgColorValue)
    ? featuredBrandBgColorValue
    : "#F2EADF";

  const featuredBrandButtonColor = isHexColor(featuredBrandButtonColorValue)
    ? featuredBrandButtonColorValue
    : "#A2B39B";

  const featuredBrandTextColor = isHexColor(featuredBrandTextColorValue)
    ? featuredBrandTextColorValue
    : "#010101";

  const brandsVoirPlusButtonColor = isHexColor(brandsVoirPlusButtonColorValue)
    ? brandsVoirPlusButtonColorValue
    : "#A2B39B";

  return (
    <>
      <SiltecChip />
      {heroCarrousselList.length > 0 && (
        <>
          <div
            style={{
              width: "100vw",
              marginLeft: "calc(50% - 50vw)",
              marginRight: "calc(50% - 50vw)",
            }}
          >
            <Carroussel
              arrows
              list={heroCarrousselList}
              sx={{
                ".slick-slider": {
                  width: "100vw",
                },
                ":after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background:
                    "linear-gradient(to bottom, transparent 0%, black 1800%)",
                },
              }}
            />
          </div>
          {/* <ScrollDown /> */}
        </>
      )}

      <Container
        id="firstContainer"
        bgcolor={featuredBrandBgColor}
        bgcolorSize="lg"
        sx={{
          [UP_SM]: {
            marginTop: "7.2rem",
          },
        }}
      >
        <FeaturedBrand
          address="53 rue de Miromesnil, 75008 PARIS"
          bgcolor={featuredBrandBgColor}
          buttonColor={featuredBrandButtonColor}
          href="https://www.arflex.it/"
          logoSrc="/assets/brands/arflex.svg"
          name="Arflex"
          textColor={featuredBrandTextColor}
        />
      </Container>

      {/* <Container bgcolor="#F2EADF" bgcolorSize="lg">
        <FeaturedBrand
          address="51 rue de Miromesnil, 75008 PARIS"
          bgcolor="#F2EADF"
          href="https://www.wittmann.at//"
          logoSrc="/assets/brands/wittmann.svg"
          name="Wittmann"
        />
      </Container> */}

      {collections !== undefined && collections.length > 0 && (
        <Section
          sx={{
            marginTop: "7.2rem",
            padding: { xs: "4.8rem 2.4rem", lg: "8rem" },
          }}
        >
          <div>
            <CollectionsSection collections={collections} />
          </div>
        </Section>
      )}

      {projects !== undefined && projects.length > 0 && (
        <Section
          title="Nos réalisations"
          description="Hôtel à Courchevel ou sur une plage de Corse, espaces lounge d'aéroport, boutiques de joaillers, bureaux d'une tour de la Défense ou appartement privé, découvrez une sélection parmi nos réalisations."
          href="/projects"
          buttonColor={brandsVoirPlusButtonColor}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: { xs: "4.8rem 2.4rem", lg: "8rem" },
          }}
        >
          <div style={{ width: "100%" }}>
            <ProjectsSection projects={projects} />
          </div>
        </Section>
      )}
      {brands !== undefined && brands.length > 0 && (
        <Section
          containerId="lastContainer"
          title="Nos partenaires"
          href="/brands"
          buttonColor={brandsVoirPlusButtonColor}
          sx={{
            padding: { xs: "4.8rem 2.4rem", lg: "8rem" },
          }}
        >
          <RoundWrapper bgcolor={brandsBgColor}>
            <div style={{ width: "100%" }}>
              <BrandsSection brands={brands} />
            </div>
          </RoundWrapper>
        </Section>
      )}
    </>
  );
}

