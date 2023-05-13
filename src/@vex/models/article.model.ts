import { Vendeur } from "./utilisateur.model";

export class Article {
  id: string;
  Titre: string;
  PrixInitialeUnitaire: string;
  PrixInitialeUnitaireTexteLibre: string;
  PrixPromoUnitaire: string;
  Photos: Photo[];
  QuantiteInitiale: number;
  QuantiteEnStock: number;
  Categorie: string;
  Marque: string;
  Description: string;
  IsPromo: boolean;
  CodePromo: string;
  IsActive: boolean;
  IsValid: boolean;
  Vendeur: Vendeur = new  Vendeur();
  CreatedDate: Date;
  CreatedDateString: string;
  LastUpdatedDate: Date;
  LastUpdatedDateString: string;
}

export class Photo {
  Order: number;
  PhotoBase64: string;
  IsNoImage: boolean;
}