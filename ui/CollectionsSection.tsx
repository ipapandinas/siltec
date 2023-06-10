"use client";
import dynamic from "next/dynamic";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";

import { ICollection } from "#/interfaces/ICollection";
import { COLOR_PRIMARY_MAIN } from "#/utils/constants";
import cloudinary from "#/utils/cloudinary";

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
      {collections.map(({ id, attributes }, idx) => {
        const { couleur, description, image, slug, titre } = attributes;
        const { alternativeText, hash } = image.data?.attributes ?? {};

        if (!hash) return null;

        const srcCloudinary = cloudinary
          .image(hash)
          .resize(thumbnail().width(600).height(620))
          .toURL();

        return (
          <div key={id}>
            {!isDesktop && (
              <MobileCollectionBlock
                color={couleur ?? COLOR_PRIMARY_MAIN}
                imageAlt={alternativeText ?? `Collection - ${titre}`}
                imageHref={srcCloudinary}
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
                imageAlt={alternativeText ?? `Collection - ${titre}`}
                imageHref={srcCloudinary}
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
