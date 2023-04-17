export interface IContactSinglePage {
  id: string;
  attributes: {
    titre: string;
    sousTitre: string | null;
    couleur: string;
  };
}
