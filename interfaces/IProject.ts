import { IImage } from "./IImage";

export interface IProject {
  documentId: string;
  titre: string;
  description: string | null;
  medias: IImage[] | null;
  rank: number;
  slug: string;
  date: string | null;
  createdAt: string;
}

export interface IProjectSinglePage {
  documentId: string;
  titre: string;
  sousTitre: string;
  couleur: string;
}
