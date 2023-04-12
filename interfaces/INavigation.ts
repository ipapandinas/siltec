import { IImage } from "./IImage";

export type PastilleType = {
  couleur: string;
  titre: string;
  url: string;
  picto: {
    data: IImage;
  };
};

export interface INavigation {
  attributes: {
    pastille: PastilleType[];
  };
}
