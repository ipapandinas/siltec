import { ICollection } from "#/interfaces/ICollection";
import { COLOR_PRIMARY_MAIN } from "#/utils/constants";

import CollectionBlock from "./CollectionBlock";
import MobileCollectionBlock from "./MobileCollectionBlock";

export default function CollectionsSection({
  collections,
}: {
  collections: ICollection[];
}) {
  return (
    <div>
      {collections.map(({ id, attributes }, idx) => {
        const { couleur, description, image, slug, titre } = attributes;
        const { alternativeText, url } = image.data?.attributes ?? {};

        if (!url) return null;

        return (
          <div key={id}>
            <MobileCollectionBlock
              color={couleur ?? COLOR_PRIMARY_MAIN}
              imageAlt={alternativeText ?? `Collection - ${titre}`}
              imageHref={url}
              isRtl={idx % 2 === 1}
              linkHref={`/c/${slug}`}
              linkTitle={`Collection - ${titre}`}
              title={titre}
            />
            <CollectionBlock
              color={couleur ?? COLOR_PRIMARY_MAIN}
              description={description ?? ""}
              imageAlt={alternativeText ?? `Collection - ${titre}`}
              imageHref={url}
              isRtl={idx % 2 === 1}
              linkHref={`/c/${slug}`}
              linkTitle={`Collection - ${titre}`}
              title={titre}
            />
          </div>
        );
      })}
    </div>
  );
}
