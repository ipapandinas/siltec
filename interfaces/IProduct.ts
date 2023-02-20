import { ICollection } from "./ICollection";
import { IDocument, IImage } from "./IImage";
import { ITypology } from "./ITypology";

export interface IProduct {
  id: string;
  attributes: {
    titre: string;
    designer: string | null;
    description: string | null;
    marque: string | null;
    document: {
      data: IDocument | null;
    };
    image: {
      data: IImage | null;
    };
    picto: {
      data: IImage | null;
    };
    medias: {
      data: IImage[] | null;
    };
    rank: number;
    slug: string;
    collection: {
      data: ICollection | null;
    };
    typology: {
      data: ITypology | null;
    };
  };
}
