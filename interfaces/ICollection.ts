import { IImage } from "./IImage";

export interface ICollection {
  documentId: string;
  titre: string;
  description: string | null;
  couleur: string | null;
  image: IImage | null;
  rank: number;
  slug: string;
}

export interface ICollectionSinglePage {
  documentId: string;
  titre: string;
  sousTitre: string;
  couleur: string;
}
