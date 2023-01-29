"use client";

import { IImage } from "#/interfaces/IImage";
import { API_URL } from "#/utils/constants";
import { Grid } from "@mui/material";

import Card from "./Card";

interface IItem {
  id: string;
  attributes: {
    title: string;
    card: {
      data: IImage;
    } | null;
    image: {
      data: IImage;
    };
  };
}

interface IProps {
  items: any;
  subPath?: string;
}

export default function Explore({ items, subPath }: IProps) {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      rowSpacing={8}
      columnSpacing={16}
      sx={{ maxWidth: 1000 }}
    >
      {items.map(({ id, attributes }: any) => {
        const { image, titre, slug, vignette } = attributes;
        const { alternativeText, url } =
          vignette?.data?.attributes ?? image?.data?.attributes ?? {};

        if (!url) return null;

        return (
          <Grid item key={id} lg={6} md={6} sm={6}>
            <Card
              href={
                subPath
                  ? subPath === "p"
                    ? `/p/${id}`
                    : `/${subPath}/${slug}`
                  : slug
              }
              imageAlt={alternativeText ?? `Item - ${titre}`}
              imageSrc={`${API_URL}${url}`}
              label={titre}
              title={titre}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
