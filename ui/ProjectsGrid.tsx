"use client";

import { IProject } from "#/interfaces/IProject";
import { Grid } from "@mui/material";

import Card from "./Card";

export default function ProjectsGrid({ projects }: { projects: IProject[] }) {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      rowSpacing={16}
      columnSpacing={9}
      sx={{ width: "100%" }}
    >
      {projects.slice(0, 3).map(({ documentId, titre, medias, slug }) => {
        const thumbnailImage = medias?.[0] ?? null;

        return (
          <Grid
            key={documentId}
            size={{ xs: 12, sm: 6, md: 4, lg: 4 }}
            sx={{
              display: "flex",
              width: "100%",
              ".MuiCard-root": {
                width: "100%",
                flex: 1,
                borderTopLeftRadius: "4rem",
                borderBottomRightRadius: "4rem",
              },
            }}
          >
            <Card
              href={`/projects/${slug}`}
              image={thumbnailImage}
              imageAlt={thumbnailImage?.alternativeText ?? `Item - ${titre}`}
              label={titre}
              title={titre}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
