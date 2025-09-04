export const getLocalStoredItems = <T>(
  localStorageKey: string,
  errorMessage: string = "Exception while parsing localstorage menu item data",
) => {
  const stored = localStorage.getItem(localStorageKey);
  let items: Array<T> = [];
  if (stored) {
    try {
      items = JSON.parse(stored);
    } catch (err) {
      console.error(`${errorMessage}: ${err}`);
      items = [];
    }
  }
  return items;
};
