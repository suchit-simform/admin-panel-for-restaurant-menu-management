import type { CurrencyOption } from "src/types/common";

export const formatPrice = (price: number = 0, currencyOption?: CurrencyOption): string => {
  return Intl.NumberFormat(currencyOption?.locales || "en-US", {
    style: currencyOption?.style || "currency",
    currency: currencyOption?.currency || "USD",
  }).format(price);
};
