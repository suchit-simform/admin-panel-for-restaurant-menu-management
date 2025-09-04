import type { CurrencyOption } from "src/types/common";

export const formatPrice = (price: number = 0, currencyOption?: CurrencyOption): string => {
  const { locales = "en-US", style = "currency", currency = "USD" } = currencyOption || {};
  return Intl.NumberFormat(locales, {
    style,
    currency,
  }).format(price);
};
