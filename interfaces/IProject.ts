import { IImage } from "./IImage";

export interface IProject {
  documentId: string;
  titre: string;
  description: string | null;
  // Derived client-side from medias[0] for card compatibility.
  image: IImage | null;
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
