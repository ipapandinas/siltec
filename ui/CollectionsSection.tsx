import { getCollections } from "#/lib/getCollections";
import { COLOR_PRIMARY_MAIN } from "#/utils/constants";

import CollectionBlock from "./CollectionBlock";
import MobileCollectionBlock from "./MobileCollectionBlock";

export default async function CollectionsSection() {
  const collections = await getCollections();

  if (!collections) return null; //todo: 404

  return (
    <>
      {collections.slice(0, 2).map(({ id, attributes }, idx) => {
        const { couleur, description, image, slug, titre } = attributes;
        const { alternativeText, url } = image.data?.attributes ?? {};

        if (!url) return null;

        return (
          <>
            <MobileCollectionBlock
              key={id}
              color={couleur ?? COLOR_PRIMARY_MAIN}
              imageAlt={alternativeText ?? `Collection - ${titre}`}
              imageHref={url}
              isRtl={idx % 2 === 1}
              linkHref={`/c/${slug}`}
              linkTitle={`Collection - ${titre}`}
              title={titre}
            />
            <CollectionBlock
              key={id}
              color={couleur ?? COLOR_PRIMARY_MAIN}
              description={description ?? ""}
              imageAlt={alternativeText ?? `Collection - ${titre}`}
              imageHref={url}
              isRtl={idx % 2 === 1}
              linkHref={`/c/${slug}`}
              linkTitle={`Collection - ${titre}`}
              title={titre}
            />
          </>
        );
      })}
    </>
  );
}
