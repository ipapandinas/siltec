import { IImage } from "./IImage";

export interface IBrand {
  documentId: string;
  nom: string;
  slug: string | null;
  premium: boolean | null;
  description?: string | null;
  logo: IImage | null;
  banner?: IImage | null;
}
