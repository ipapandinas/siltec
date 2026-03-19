"use client";

import { IBrand } from "#/interfaces/IBrand";
import { resolveImageUrl } from "#/utils/media";
import { Grid } from "@mui/material";

import AppImage from "./AppImage";
import AppLink from "./AppLink";

interface IProps {
  list: IBrand[];
}

export default function BrandsGrid({ list }: IProps) {
  return (
      <Grid container rowSpacing={12} columnSpacing={4} justifyContent="center">
        {list.map(({ documentId, nom, logo, slug }) => {
          const url = resolveImageUrl(logo);

          if (!url) return null;

          return (
              <Grid
                key={documentId}
                size={{ xs: 6, md: 3 }}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  img: { width: "auto", maxWidth: 115, transition: "filter .15s ease" },
                }}
              >
                {slug ? (
                  <AppLink
                    href={`/b/${slug}`}
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "1.2rem",
                      px: "0.6rem",
                      py: "0.4rem",
                      cursor: "pointer",
                      transition: "transform .15s ease, opacity .15s ease",
                      "&:hover, &:focus-visible": {
                        transform: "translateY(-4px)",
                        opacity: 0.85,
                      },
                    }}
                  >
                    <AppImage
                      alt={`${nom} logo`}
                      src={url}
                      width={115}
                      height={40}
                      loadMode="md"
                    />
                  </AppLink>
                ) : (
                  <AppImage
                    alt={`${nom} logo`}
                    src={url}
                    width={115}
                    height={40}
                    loadMode="md"
                  />
                )}
              </Grid>
          );
        })}
      </Grid>
  );
}
