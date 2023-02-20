"use client";

import { IImage } from "#/interfaces/IImage";
import { Grid } from "@mui/material";

import Card from "./Card";

interface IProps {
  isLeafPage?: boolean;
  items: any;
  subPath?: string;
}

export default function Explore({
  isLeafPage = false,
  items,
  subPath,
}: IProps) {
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
        const { image, titre, slug } = attributes;
        const { alternativeText, url } = image?.data?.attributes ?? {};

        if (!url) return null;

        return (
          <Grid item key={id} lg={4} md={4} sm={6}>
            <Card
              href={
                `${subPath ? `/${subPath}` : ""}` +
                `${isLeafPage ? `/${id}` : `/${slug}`}`
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
