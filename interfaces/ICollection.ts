import { IImage } from "./IImage";

export interface ICollection {
  id: string;
  attributes: {
    titre: string;
    description: string | null;
    couleur: string | null;
    image: {
      data: IImage | null;
    };
    rank: number;
    slug: string;
  };
}

export interface ICollectionSinglePage {
  id: string;
  attributes: {
    titre: string;
    sousTitre: string;
    couleur: string;
  };
}
