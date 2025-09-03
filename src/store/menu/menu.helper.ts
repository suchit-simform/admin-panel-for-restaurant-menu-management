import { LOCAL_STORAGE_MENU_KEY } from "./menu.constant";
import type { Menu } from "./menu.type";

export const getStoredMenuItems = () => {
  const stored = localStorage.getItem(LOCAL_STORAGE_MENU_KEY);
  const menuItems: Menu[] = stored ? JSON.parse(stored) : [];
  return menuItems;
};
