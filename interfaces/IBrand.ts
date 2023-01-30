import { IImage } from "./IImage";

export interface IBrand {
  id: string;
  attributes: {
    nom: string;
    vedette: boolean;
    logo: {
      data: IImage | null;
    };
  };
}
