import type { Category } from "../category/category.type";
import type { Ingredient } from "../ingredient/ingredient.type";

export type Menu = {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: Category[];
  ingredients: Ingredient[];
  isAvailable: boolean;
  priority?: number;
};

export type MenuPayload = Omit<Menu, "id" | "category" | "ingredients"> & {
  category: string[];
  ingredients: string[];
};
