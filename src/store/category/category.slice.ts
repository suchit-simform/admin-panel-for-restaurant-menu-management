import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Category } from "./category.type";

export interface CategoryState {
  items: Category[];
}

const initialState: CategoryState = {
  items: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      state.items = [...state.items, action.payload];
    },
    removeCategoryItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateCategoryItem: (state, action: PayloadAction<Category>) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.items = action.payload;
    },
  },
});

export const { addCategory, removeCategoryItem, updateCategoryItem, setCategories } = categorySlice.actions;

export default categorySlice.reducer;
