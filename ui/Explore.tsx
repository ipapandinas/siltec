"use client";

import { Grid } from "@mui/material";

import Card from "./Card";

interface IProps {
  isLeafPage?: boolean;
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
      rowSpacing={12}
      columnSpacing={9}
    >
      {items.map(({ id, attributes }: any) => {
        const { image, titre, slug } = attributes;
        const { alternativeText, hash } = image?.data?.attributes ?? {};

        if (!hash) return null;

        return (
          <Grid
            item
            key={id}
            lg={4}
            md={4}
            sm={6}
            xs={12}
            sx={{
              ".MuiCard-root": {
                borderTopLeftRadius: "4rem",
                borderBottomRightRadius: "4rem",
              },
            }}
          >
            <Card
              href={`${subPath ? `/${subPath}` : ""}` + `/${slug}`}
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
