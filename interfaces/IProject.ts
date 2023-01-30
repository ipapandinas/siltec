import { IImage } from "./IImage";

export interface IProject {
  id: string;
  attributes: {
    titre: string;
    description: string | null;
    vignette: {
      data: IImage;
    };
    medias: {
      data: IImage | null;
    };
    couleur: string | null;
    rank: number;
    slug: string;
    createdAt: string;
  };
}
