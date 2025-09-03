export type Menu = {
  id: string;
  name: string;
  description: string;
  currencySymbol: string;
  price: number;
  category: string[];
  isAvailable: boolean;
  priority: number;
};
