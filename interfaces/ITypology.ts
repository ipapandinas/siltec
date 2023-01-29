import { ICollection } from "./ICollection";
import { IImage } from "./IImage";

export interface ITypoligy {
  id: string;
  attributes: {
    title: string;
    card: {
      data: IImage | null;
    };
    image: {
      data: IImage | null;
    };
    collection: {
      data: ICollection;
    };
    rank: number;
    slug: string;
  };
}
