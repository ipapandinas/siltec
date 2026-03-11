"use client";
import dynamic from "next/dynamic";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { ICollection } from "#/interfaces/ICollection";
import { COLOR_PRIMARY_MAIN } from "#/utils/constants";
import { resolveImageUrl } from "#/utils/media";

const CollectionBlock = dynamic(() => import("./CollectionBlock"));
const MobileCollectionBlock = dynamic(() => import("./MobileCollectionBlock"));

export default function CollectionsSection({
  collections,
}: {
  collections: ICollection[];
}) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <div>
      {collections.map(({ couleur, description, image, slug, titre, documentId }, idx) => {
        const imageSrc = resolveImageUrl(image);

        return (
          <div key={documentId}>
            {!isDesktop && (
              <MobileCollectionBlock
                color={couleur ?? COLOR_PRIMARY_MAIN}
                imageAlt={image?.alternativeText ?? `Collection - ${titre}`}
                imageHref={imageSrc}
                isRtl={idx % 2 === 1}
                linkHref={`/c/${slug}`}
                linkTitle={`Collection - ${titre}`}
                title={titre}
              />
            )}
            {isDesktop && (
              <CollectionBlock
                color={couleur ?? COLOR_PRIMARY_MAIN}
                description={description ?? ""}
                imageAlt={image?.alternativeText ?? `Collection - ${titre}`}
                imageHref={imageSrc}
                isRtl={idx % 2 === 1}
                linkHref={`/c/${slug}`}
                linkTitle={`Collection - ${titre}`}
                title={titre}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
