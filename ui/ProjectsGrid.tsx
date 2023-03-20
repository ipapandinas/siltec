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
      rowSpacing={16}
      columnSpacing={9}
    >
      {projects.slice(0, 3).map(({ id, attributes }, idx) => {
        const { slug, titre, image } = attributes;
        const { alternativeText, url } = image.data?.attributes ?? {};

        if (!url) return null;

        return (
          <Grid
            item
            key={id}
            lg={4}
            md={4}
            sm={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              ".MuiCard-root": {
                borderTopLeftRadius: "4rem",
                borderBottomRightRadius: "4rem",
              },
            }}
          >
            <Card
              key={idx}
              href={`/projects/${id}`}
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
