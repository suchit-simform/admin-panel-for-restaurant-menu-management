import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string[];
  isAvailable: boolean;
  priority: number;
}

export interface MenuState {
  menuItems: MenuItem[];
}

const initialState: MenuState = {
  menuItems: [],
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    addMenuItem: (state, action: PayloadAction<MenuItem>) => {
      state.menuItems.push(action.payload);
    },
    removeMenuItem: (state, action: PayloadAction<string>) => {
      state.menuItems = state.menuItems.filter((item) => item.id !== action.payload);
    },
    updateMenuItem: (state, action: PayloadAction<MenuItem>) => {
      const index = state.menuItems.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.menuItems[index] = action.payload;
      }
    },
  },
});

export const { addMenuItem, removeMenuItem, updateMenuItem } = menuSlice.actions;

export default menuSlice.reducer;
