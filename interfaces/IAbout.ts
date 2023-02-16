import { IImage } from "./IImage";

export interface IAboutSinglePage {
  id: string;
  attributes: {
    description: string;
    titre: string;
    sousTitre: string;
    couleur: string;
    trombinoscope: {
      data: IImage | null;
    };
  };
}
