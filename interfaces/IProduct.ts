import { IBrand } from "./IBrand";
import { ICollection } from "./ICollection";
import { IImage } from "./IImage";
import { ITypology } from "./ITypology";

export interface IProduct {
  documentId: string;
  titre: string;
  designer: string | null;
  dimensions: string | null;
  annee: number | null;
  description: string | null;
  marque: Pick<IBrand, "documentId" | "nom" | "slug"> | null;
  medias: IImage[] | null;
  rank: number;
  slug: string;
  collections: ICollection[] | null;
  typologies: ITypology[] | null;
}
