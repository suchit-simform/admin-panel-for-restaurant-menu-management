import type { User } from "src/types/user";

export const toCapitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Generate a 32-byte (256-bit) random token, encoded as hex (browser-safe)
export function generateAuthToken() {
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
}

export function getUserName(user: User | null | undefined) {
  if (!user) {
    return "Guest";
  }
  if (!user?.email || !user?.role) return "Guest";

  return user.email.split("@")[0].substring(0, 2).toLocaleUpperCase() || "";
}
