import { IImage } from "./IImage";

export interface INews {
  id: string;
  attributes: {
    titre: string;
    corps: string | null;
    image: {
      data: IImage;
    };
    medias: {
      data: IImage[] | null;
    };
    rank: number;
    slug: string;
    createdAt: string;
  };
}

export interface INewsSinglePage {
  id: string;
  attributes: {
    titre: string;
    sousTitre: string;
    couleur: string;
  };
}
