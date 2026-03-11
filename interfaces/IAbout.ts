import { IImage } from "./IImage";

export interface IAboutSinglePage {
  documentId: string;
  description: string;
  titre: string;
  sousTitre: string;
  couleur: string;
  trombinoscope: IImage | null;
}
