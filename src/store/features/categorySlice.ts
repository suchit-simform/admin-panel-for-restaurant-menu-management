import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface CategoryItem {
  id: string;
  name: string;
}

export interface CategoryState {
  categories: CategoryItem[];
}

const initialState: CategoryState = {
  categories: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<CategoryItem>) => {
      state.categories.push(action.payload);
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter((category) => category.id !== action.payload);
    },
    updateCategory: (state, action: PayloadAction<{ categoryId: string; newCategory: CategoryItem }>) => {
      const index = state.categories.findIndex((category) => category.id === action.payload.categoryId);
      if (index !== -1) {
        state.categories[index] = action.payload.newCategory;
      }
    },
  },
});

export const { addCategory, removeCategory, updateCategory } = categorySlice.actions;

export default categorySlice.reducer;
