import { ICollection } from "./ICollection";
import { IDocument, IImage } from "./IImage";
import { ITypoligy } from "./ITypology";

export interface IProduct {
  id: string;
  attributes: {
    titre: string;
    designer: string;
    description: string;
    marque: string;
    document: {
      data: IDocument | null;
    };
    image: {
      data: IImage | null;
    };
    medias: {
      data: IImage[] | null;
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
