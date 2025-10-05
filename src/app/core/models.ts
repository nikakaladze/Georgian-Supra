export interface Recipe {
  id?: number;
  title: string;
  shortDescription: string;
  ingredients: string[];
  instructions: string;
  imageUrl: string;
  favorite: boolean;
}
