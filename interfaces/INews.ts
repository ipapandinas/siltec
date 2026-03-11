import { IImage } from "./IImage";

export interface INews {
  documentId: string;
  titre: string;
  corps: string | null;
  image: IImage | null;
  medias: IImage[] | null;
  rank: number;
  slug: string;
  createdAt: string;
}

export interface INewsSinglePage {
  documentId: string;
  titre: string;
  sousTitre: string;
  couleur: string;
}
