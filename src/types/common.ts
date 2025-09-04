export type FormData = {
  id?: string;
  email?: string;
  name?: string;
  password?: string;
  phone?: string;
};

export type Role = "admin" | "user";

export type CurrencyOption = {
  locales?: Intl.LocalesArgument;
  style: Intl.NumberFormatOptions["style"];
  currency?: Intl.NumberFormatOptions["currency"];
};
