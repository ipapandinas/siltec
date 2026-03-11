import { ICollection } from "./ICollection";
import { IImage } from "./IImage";
import { ITypology } from "./ITypology";

export interface IProduct {
  documentId: string;
  titre: string;
  designer: string | null;
  description: string | null;
  marque: string | null;
  image: IImage | null;
  medias: IImage[] | null;
  rank: number;
  slug: string;
  collections: ICollection[] | null;
  typologies: ITypology[] | null;
}
