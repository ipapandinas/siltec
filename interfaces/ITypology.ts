import { ICollection } from "./ICollection";
import { IImage } from "./IImage";

export interface ITypology {
  documentId: string;
  titre: string;
  image: IImage | null;
  collections: ICollection[] | null;
  rank: number;
  slug: string;
}
