import { IImage } from "./IImage";

export interface IBrand {
  documentId: string;
  nom: string;
  slug: string | null;
  premium: boolean | null;
  logo: IImage | null;
}
