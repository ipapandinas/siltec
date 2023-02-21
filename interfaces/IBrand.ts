import { IImage } from "./IImage";

export interface IBrand {
  id: string;
  attributes: {
    nom: string;
    premium: boolean;
    logo: {
      data: IImage | null;
    };
  };
}
