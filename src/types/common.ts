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

export type CloudinaryResponse = {
  secure_url: string;
  public_id: string;
  url: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  created_at: string;
  resource_type: string;
  type: string;
  version: number;
  folder?: string;
  tags?: string[];
  display_name: string;
};
