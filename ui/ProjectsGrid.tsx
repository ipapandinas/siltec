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
      alignItems="center"
      spacing={8}
      sx={{ maxWidth: 1000 }}
    >
      {projects.slice(0, 3).map(({ id, attributes }, idx) => {
        const { slug, titre, vignette } = attributes;
        const { alternativeText, url } = vignette.data?.attributes ?? {};

        if (!url) return null;

        return (
          <Grid
            item
            key={id}
            xs={12}
            sm={6}
            md={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Card
              key={idx}
              href={`/p/${slug}`}
              imageAlt={alternativeText ?? `Item - ${titre}`}
              imageSrc={url}
              label={titre}
              title={titre}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
