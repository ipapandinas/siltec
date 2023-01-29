import { IImage } from "./IImage";

export interface ICollection {
  id: string;
  attributes: {
    title: string;
    description: string | null;
    color: string | null;
    card: {
      data: IImage;
    };
    image: {
      data: IImage | null;
    };
    rank: number;
    slug: string;
  };
}
