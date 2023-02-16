"use client";

import { IImage } from "#/interfaces/IImage";
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
      rowSpacing={16}
      columnSpacing={9}
    >
      {items.map(({ id, attributes }: any) => {
        const { image, titre, slug, vignette } = attributes;
        const { alternativeText, url } =
          vignette?.data?.attributes ?? image?.data?.attributes ?? {};

        if (!url) return null;

        return (
          <Grid item key={id} lg={4} md={4} sm={6}>
            <Card
              href={
                subPath
                  ? subPath === "p"
                    ? `/p/${id}`
                    : `/${subPath}/${slug}`
                  : slug
              }
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
