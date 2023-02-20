import { ICollection } from "./ICollection";
import { IImage } from "./IImage";

export interface ITypology {
  id: string;
  attributes: {
    titre: string;
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
