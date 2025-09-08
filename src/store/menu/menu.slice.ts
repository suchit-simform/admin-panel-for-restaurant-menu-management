import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Menu } from "./menu.type";

export interface MenuState {
  items: Menu[];
}

const initialState: MenuState = {
  items: [],
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    addMenuItem: (state, action: PayloadAction<Menu>) => {
      state.items = [...state.items, action.payload];
    },
    removeMenuItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateMenuItem: (state, action: PayloadAction<Menu>) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    setMenus: (state, action: PayloadAction<Menu[]>) => {
      state.items = action.payload;
    },
  },
});

export const { addMenuItem, removeMenuItem, updateMenuItem, setMenus } = menuSlice.actions;

export default menuSlice.reducer;
