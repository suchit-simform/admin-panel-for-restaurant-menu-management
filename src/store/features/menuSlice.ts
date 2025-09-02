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
  items: MenuItem[];
}

const initialState: MenuState = {
  items: [],
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    addMenuItem: (state, action: PayloadAction<MenuItem>) => {
      state.items.push(action.payload);
    },
    removeMenuItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateMenuItem: (state, action: PayloadAction<MenuItem>) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
});

export const { addMenuItem, removeMenuItem, updateMenuItem } = menuSlice.actions;

export default menuSlice.reducer;
