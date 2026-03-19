"use client";

import { IImage } from "#/interfaces/IImage";
import { resolveImageUrl } from "#/utils/media";
import { Grid } from "@mui/material";

import Card from "./Card";

interface ExploreItem {
  documentId: string;
  titre: string;
  slug: string;
  image?: IImage | null;
  medias?: IImage[] | null;
}

interface IProps {
  isLeafPage?: boolean;
  items: ExploreItem[];
  subPath?: string;
}

export default function Explore({ items, subPath }: IProps) {
  const safeItems = items.filter((item): item is ExploreItem => {
    if (!item || !item.documentId || !item.titre || !item.slug) {
      return false;
    }

    const thumbnailImage = item.medias?.[0] ?? item.image ?? null;

    return Boolean(resolveImageUrl(thumbnailImage));
  });

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      rowSpacing={12}
      columnSpacing={9}
    >
      {safeItems.map(({ documentId, image, medias, titre, slug }) => {
        const thumbnailImage = medias?.[0] ?? image ?? null;

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
              image={thumbnailImage}
              imageAlt={thumbnailImage?.alternativeText ?? `Item - ${titre}`}
              label={titre}
              title={titre}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
