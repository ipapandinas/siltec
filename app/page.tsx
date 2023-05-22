import { cache } from "react";
import { gql } from "graphql-request";

import { ICollection } from "#/interfaces/ICollection";
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
import { GRAPHQL_API_URL, UP_SM } from "#/utils/constants";
import { IBrand } from "#/interfaces/IBrand";
import { IProject } from "#/interfaces/IProject";
import { IImage } from "#/interfaces/IImage";

export default async function Home() {
  const data = await getContent();
  const brands = data?.brands.data;
  const carroussel = data?.carroussel?.data.attributes.medias.data;
  const collections = data?.collections.data;
  const projects = data?.projects.data;

  return (
    <>
      <SiltecChip />
      {carroussel !== undefined && carroussel.length > 0 && (
        <>
          <Carroussel
            isHero
            list={carroussel.map(({ attributes }) => attributes.url)}
            sx={{
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
          <ScrollDown />
        </>
      )}

      <Container
        id="firstContainer"
        bgcolor="#F2EADF"
        bgcolorSize="lg"
        sx={{
          [UP_SM]: {
            marginTop: "7.2rem",
          },
        }}
      >
        <FeaturedBrand
          address="53 rue de Miromesnil, 75008 PARIS"
          bgcolor="#F2EADF"
          href="https://www.arflex.it/"
          logoSrc="/assets/brands/arflex.svg"
          name="Arflex"
        />
      </Container>

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
          sx={{
            dipslay: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: { xs: "4.8rem 2.4rem", lg: "8rem" },
          }}
        >
          <div>
            <ProjectsSection projects={projects} />
          </div>
        </Section>
      )}
      {brands !== undefined && brands.length > 0 && (
        <Section
          containerId="lastContainer"
          title="Nos partenaires"
          href="/brands"
          sx={{
            padding: { xs: "4.8rem 2.4rem", lg: "8rem" },
          }}
        >
          <RoundWrapper bgcolor="background.default">
            <div style={{ width: "100%" }}>
              <BrandsSection brands={brands} />
            </div>
          </RoundWrapper>
        </Section>
      )}
    </>
  );
}

const getContent = cache(async () => {
  try {
    const query = gql`
      {
        carroussel {
          data {
            attributes {
              medias {
                data {
                  attributes {
                    alternativeText
                    url
                  }
                }
              }
            }
          }
        }
        collections(sort: ["rank:ASC"], pagination: { pageSize: 2 }) {
          data {
            id
            attributes {
              titre
              description
              couleur
              image {
                data {
                  attributes {
                    alternativeText
                    url
                  }
                }
              }
              rank
              slug
            }
          }
        }
        projects(sort: ["rank:ASC"], pagination: { pageSize: 3 }) {
          data {
            id
            attributes {
              titre
              image {
                data {
                  attributes {
                    alternativeText
                    url
                  }
                }
              }
              couleur
              rank
              slug
            }
          }
        }
        brands(
          filters: { premium: { eq: true } }
          pagination: { pageSize: 50 }
          sort: "nom:asc"
        ) {
          data {
            id
            attributes {
              nom
              premium
              logo {
                data {
                  attributes {
                    alternativeText
                    url
                  }
                }
              }
            }
          }
        }
      }
    `;
    return await fetch(GRAPHQL_API_URL, {
      next: { revalidate: 60 },
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
      }),
    })
      .then((response) => response.json())
      .then(
        (content: {
          data: {
            brands: { data: IBrand[] };
            carroussel: {
              data: {
                attributes: {
                  medias: {
                    data: IImage[];
                  };
                };
              };
            };
            collections: { data: ICollection[] };
            projects: { data: IProject[] };
          };
        }) => {
          return content.data;
        }
      );
  } catch (err: any) {
    console.error(
      `Collections could not have been fetched - Detail: ${
        err?.message ? err.message : JSON.stringify(err)
      }`
    );
  }
});
