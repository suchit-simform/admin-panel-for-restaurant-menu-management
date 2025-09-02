export const toCapitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export function generateAuthToken() {
  return Math.random().toString(36).substring(2);
}
