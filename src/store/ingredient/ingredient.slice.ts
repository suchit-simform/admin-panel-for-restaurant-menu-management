import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Ingredient } from "./ingredient.type";

export interface IngredientState {
  items: Ingredient[];
}

const initialState: IngredientState = {
  items: [],
};

export const ingredientSlice = createSlice({
  name: "ingredient",
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<Ingredient>) => {
      state.items.push(action.payload);
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateIngredient: (state, action: PayloadAction<Ingredient>) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
});

export const { addIngredient, removeIngredient, updateIngredient } = ingredientSlice.actions;

export default ingredientSlice.reducer;
