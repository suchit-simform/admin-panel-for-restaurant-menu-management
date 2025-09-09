import { DEFAULT_CURRENCY } from "src/components/molecules/InputNumberWithCurrency";
import currencyList from "src/components/molecules/InputNumberWithCurrency/currencyList";
import type { Currency, CurrencyOption } from "src/components/molecules/InputNumberWithCurrency/type";
export const locale = "en-US";

export const currencyOptions: CurrencyOption[] = currencyList.data.map((c: Currency) => ({
  label: c.CcyNm,
  value: `${c.CtryNm}::${c.Ccy}`,
}));

export const currencyFormatter =
  (selectedCurrOpt: string = DEFAULT_CURRENCY) =>
  (value: number | string | undefined): string => {
    let currencyCode = selectedCurrOpt?.split("::")[1];
    if (!currencyCode) {
      currencyCode = DEFAULT_CURRENCY.split("::")[1];
    }
    const numValue = typeof value === "string" ? Number(value) : value;
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
    }).format(numValue ?? 0);
  };

export const currencyParser = (val?: string): number => {
  try {
    if (typeof val === "string" && !val.length) {
      val = "0.0";
    }

    const group = new Intl.NumberFormat(locale).format(1111).replace(/1/g, "");
    const decimal = new Intl.NumberFormat(locale).format(1.1).replace(/1/g, "");
    let reversedVal = val?.replace(new RegExp("\\" + group, "g"), "") ?? "";
    reversedVal = reversedVal.replace(new RegExp("\\" + decimal, "g"), ".");
    reversedVal = reversedVal.replace(/[^0-9.]/g, "");

    const digitsAfterDecimalCount = (reversedVal.split(".")[1] || "").length;
    const needsDigitsAppended = digitsAfterDecimalCount > 2;

    if (needsDigitsAppended) {
      reversedVal = String(Number(reversedVal) * Math.pow(10, digitsAfterDecimalCount - 2));
    }

    const num = Number(reversedVal);
    return Number.isNaN(num) ? 0 : num;
  } catch (error) {
    console.error(error);
    return 0;
  }
};
