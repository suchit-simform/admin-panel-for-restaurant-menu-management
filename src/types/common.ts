export type FormData = {
  id?: string;
  email?: string;
  name?: string;
  password?: string;
  phone?: string;
};

export type Role = "admin" | "user";

export type CurrencyOption = {
  locales?: string;
  style: Intl.NumberFormatOptions["style"];
  currency?: Intl.NumberFormatOptions["currency"];
};
