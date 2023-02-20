"use client";

import { IBrand } from "#/interfaces/IBrand";
import { Grid } from "@mui/material";

import AppImage from "./AppImage";

interface IProps {
  list: IBrand[];
}

export default function BrandsGrid({ list }: IProps) {
  return (
    <Grid container rowSpacing={12} columnSpacing={4} justifyContent="center">
      {list.map(({ id, attributes }) => {
        const { nom, logo } = attributes;
        const { url } = logo.data?.attributes ?? {};

        if (!url) return null;

        return (
          <Grid
            key={id}
            item
            xs={12}
            sm={6}
            md={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              img: { width: "auto", maxWidth: 115 },
            }}
          >
            <AppImage
              alt={`${nom} logo`}
              src={url}
              width={115}
              height={40}
              loadMode="sm"
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
