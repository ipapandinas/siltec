import { getCollections } from "#/lib/getCollections";
import { API_URL, COLOR_PRIMARY_MAIN } from "#/utils/constants";

import CollectionBlock from "./CollectionBlock";

export default async function CollectionsSection() {
  const collections = await getCollections();

  return (
    <div>
      {collections.slice(0, 2).map(({ id, attributes }, idx) => {
        const { color, description, image, title } = attributes;
        const { alternativeText, url } = image.data?.attributes ?? {};

        if (!url) return null;

        return (
          <CollectionBlock
            key={id}
            color={color ?? COLOR_PRIMARY_MAIN}
            description={description ?? ""}
            imageAlt={alternativeText ?? `Collection - ${title}`}
            imageHref={`${API_URL}${url}`}
            isRtl={idx % 2 === 1}
            linkHref="/c/bureaux"
            linkTitle={`Collection - ${title}`}
            title={title}
          />
        );
      })}
    </div>
  );
}
