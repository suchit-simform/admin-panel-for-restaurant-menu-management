import type { CurrencyOption } from "src/types/common";

export type Menu = {
  id: string;
  name: string;
  description: string;
  price: number;
  currencyOption?: CurrencyOption;
  category: string[];
  ingredients: string[];
  isAvailable: boolean;
  priority?: number;
};
