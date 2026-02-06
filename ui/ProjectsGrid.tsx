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
        {projects.slice(0, 3).map(({ id, attributes }) => {
          const { titre, image, slug } = attributes;
          const { alternativeText, hash } = image.data?.attributes ?? {};

          if (!hash) return null;

          return (
              <Grid
                  key={id}
                  size={{ xs: 12, sm: 6, md: 4, lg: 4 }}
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
                    href={`/projects/${slug}`}
                    imageAlt={alternativeText ?? `Item - ${titre}`}
                    imageSrc={hash}
                    label={titre}
                    title={titre}
                />
              </Grid>
          );
        })}
      </Grid>
  );
}
