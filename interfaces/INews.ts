import { IImage } from "./IImage";

export interface INews {
  id: string;
  attributes: {
    titre: string;
    corps: string | null;
    vignette: {
      data: IImage;
    };
    medias: {
      data: IImage | null;
    };
    rank: number;
    slug: string;
    createdAt: string;
  };
}
