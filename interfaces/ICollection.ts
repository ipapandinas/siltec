import { IImage } from "./IImage";

export interface ICollection {
  id: string;
  attributes: {
    titre: string;
    description: string | null;
    couleur: string | null;
    vignette: {
      data: IImage;
    };
    image: {
      data: IImage | null;
    };
    rank: number;
    slug: string;
  };
}
