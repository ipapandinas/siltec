import { IImage } from "./IImage";

export type PastilleType = {
  couleur: string;
  titre: string;
  url: string;
  picto?: IImage | null;
};

export interface INavigation {
  documentId: string;
  pastille: PastilleType[];
}
