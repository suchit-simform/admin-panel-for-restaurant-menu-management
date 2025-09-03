import { LOCAL_STORAGE_MENU_KEY } from "./menu.constant";
import type { Menu } from "./menu.type";

export const getStoredMenuItems = () => {
  const stored = localStorage.getItem(LOCAL_STORAGE_MENU_KEY);
  let menuItems: Menu[] = [];
  if (stored) {
    try {
      menuItems = JSON.parse(stored);
    } catch (err) {
      console.log(`Exception while parsing localstorage menu item data: ${err}`);
      menuItems = [];
    }
  }
  return menuItems;
};
