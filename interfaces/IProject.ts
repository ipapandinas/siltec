import { IImage } from "./IImage";

export interface IProject {
  documentId: string;
  titre: string;
  description: string | null;
  image: IImage | null;
  medias: IImage[] | null;
  couleur: string | null;
  rank: number;
  slug: string;
  createdAt: string;
}

export interface IProjectSinglePage {
  documentId: string;
  titre: string;
  sousTitre: string;
  couleur: string;
}
