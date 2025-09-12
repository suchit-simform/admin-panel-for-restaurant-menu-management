import type { UploadFile } from "antd";
import type { CloudinaryResponse } from "src/types/common";
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
  images: Pick<UploadFile<CloudinaryResponse | undefined>, "uid" | "name" | "url">[];
};

export type MenuPayload = Omit<Menu, "id" | "category" | "ingredients" | "images"> & {
  category: string[];
  ingredients: string[];
  images: UploadFile<CloudinaryResponse | undefined>[];
};
