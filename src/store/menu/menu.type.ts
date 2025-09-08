import type { CurrencyOption } from "src/types/common";
import type { Category } from "../category/category.type";
import type { Ingredient } from "../ingredient/ingredient.type";

export type Menu = {
  id: string;
  name: string;
  description: string;
  price: number;
  currencyOption?: CurrencyOption;
  category: Category[];
  ingredients: Ingredient[];
  isAvailable: boolean;
  priority?: number;
};

export type MenuPayload = Omit<Menu, "id" | "category" | "ingredients"> & {
  category: string[];
  ingredients: string[];
};
