import { Box, Typography } from "@mui/material";
import { notFound } from "next/navigation";

import { getProject, getProjects } from "#/lib/getProjects";
import Breadcrumbs from "#/ui/Breadcrumbs";
import Container from "#/ui/Container";
import Card from "#/ui/Card";

import Content from "./content";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [project, projects] = await Promise.all([getProject(slug), getProjects()]);

  if (!project) notFound();

  const { date, description, image, medias, titre } = project;

  const relatedProjects =
    projects
      ?.filter((item) => item.slug !== slug)
      .slice(0, 3) ?? [];

  return (
    <div>
      <Container
        id="productPageContainer"
        sx={{
          marginX: { xs: "2.4rem", lg: "0" },
          padding: { xs: "4.8rem 0", lg: "4rem" },
        }}
      >
        <Box sx={{ paddingLeft: { xs: "2.4rem", lg: "0" } }}>
          <Breadcrumbs
            list={[{ name: "Réalisations", href: "/projects" }]}
            pageName={titre}
          />
        </Box>

        <div style={{ marginTop: "2.4rem" }}>
          <Content
            titre={titre}
            date={date}
            description={description}
            image={image}
            medias={medias}
          />
        </div>

        {relatedProjects.length > 0 ? (
          <Box sx={{ marginTop: { xs: "8rem", lg: "12rem" }, paddingX: "2.4rem" }}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: { xs: "4rem", lg: "6rem" } }}>
              <Box sx={{ width: "6.4rem", height: "1px", bgcolor: "rgba(0,0,0,0.2)" }} />
            </Box>
            <Typography
              variant="h4"
              textAlign="center"
              sx={{ fontWeight: 300, textTransform: "uppercase" }}
            >
              EXPLORER PLUS DE RÉALISATIONS
            </Typography>
            <Box
              sx={{
                marginTop: { xs: "4rem", lg: "5.6rem" },
                display: "flex",
                gap: { xs: "2rem", lg: "3.2rem" },
                overflowX: { xs: "auto", lg: "visible" },
                pb: { xs: "1rem", lg: 0 },
              }}
            >
              {relatedProjects.map((relatedProject) => (
                <Box
                  key={relatedProject.documentId}
                  sx={{
                    width: { xs: "280px", lg: "auto" },
                    flex: { xs: "0 0 auto", lg: "1 1 0" },
                    minWidth: 0,
                    ".MuiCard-root": {
                      height: "100%",
                    },
                    ".MuiCardMedia-root": {
                      height: { xs: 320, lg: 420 },
                    },
                  }}
                >
                  <Card
                    href={`/projects/${relatedProject.slug}`}
                    image={relatedProject.image ?? null}
                    imageAlt={relatedProject.image?.alternativeText ?? relatedProject.titre}
                    label={relatedProject.titre}
                    title={relatedProject.titre}
                    cornerVariant="default"
                  />
                </Box>
              ))}
            </Box>
          </Box>
        ) : null}
      </Container>
    </div>
  );
}
