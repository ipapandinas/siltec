import { IImage } from "./IImage";

export interface IBrand {
  documentId: string;
  nom: string;
  premium: boolean | null;
  logo: IImage | null;
}
