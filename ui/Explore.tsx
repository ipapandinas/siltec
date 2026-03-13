"use client";

import { IImage } from "#/interfaces/IImage";
import { Grid } from "@mui/material";

import Card from "./Card";

interface ExploreItem {
  documentId: string;
  titre: string;
  slug: string;
  image?: IImage | null;
}

interface IProps {
  isLeafPage?: boolean;
  items: ExploreItem[];
  subPath?: string;
}

export default function Explore({ items, subPath }: IProps) {
  const safeItems = items.filter(
    (item): item is ExploreItem =>
      Boolean(item && item.documentId && item.titre && item.slug)
  );

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      rowSpacing={12}
      columnSpacing={9}
    >
      {safeItems.map(({ documentId, image, titre, slug }) => {
        return (
          <Grid
            key={documentId}
            size={{ xs: 12, sm: 6, md: 4, lg: 4 }}
            sx={{
              ".MuiCard-root": {
                borderTopLeftRadius: "4rem",
                borderBottomRightRadius: "4rem",
              },
            }}
          >
            <Card
              href={`${subPath ? `/${subPath}` : ""}/${slug}`}
              image={image ?? null}
              imageAlt={image?.alternativeText ?? `Item - ${titre}`}
              label={titre}
              title={titre}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
