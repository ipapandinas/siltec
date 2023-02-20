import { IImage } from "./IImage";

export interface IProject {
  id: string;
  attributes: {
    titre: string;
    description: string | null;
    image: {
      data: IImage;
    };
    medias: {
      data: IImage[] | null;
    };
    couleur: string | null;
    rank: number;
    slug: string;
    createdAt: string;
  };
}

export interface IProjectSinglePage {
  id: string;
  attributes: {
    titre: string;
    sousTitre: string;
    couleur: string;
  };
}
