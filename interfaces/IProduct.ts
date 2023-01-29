import { ICollection } from "./ICollection";
import { IImage } from "./IImage";
import { ITypoligy } from "./ITypology";

export interface IProduct {
  id: string;
  attributes: {
    title: string;
    designer: string;
    description: string;
    collection: string;
    brand: string;
    card: {
      data: IImage | null;
    };
    image: {
      data: IImage | null;
    };
    rank: number;
    slug: string;
    collection: {
      data: ICollection;
    };
    typology: {
      data: ITypoligy;
    };
  };
}
