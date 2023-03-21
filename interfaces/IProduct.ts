import { ICollection } from "./ICollection";
import { IImage } from "./IImage";
import { ITypology } from "./ITypology";

export interface IProduct {
  id: string;
  attributes: {
    titre: string;
    designer: string | null;
    description: string | null;
    marque: string | null;
    image: {
      data: IImage | null;
    };
    medias: {
      data: IImage[] | null;
    };
    rank: number;
    slug: string;
    collections: {
      data: ICollection | null;
    };
    typologies: {
      data: ITypology | null;
    };
  };
}
