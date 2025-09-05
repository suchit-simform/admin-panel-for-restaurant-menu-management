import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "src/store/features/counterSlice";
import { userApi } from "src/store/api/userApi";
import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authSlice from "./features/authSlice";
import { menuApi } from "./menu/menu.api";
import menuSlice from "./menu/menu.slice";
import ingredientSlice from "./ingredient/ingredient.slice";
import categorySlice from "./category/category.slice";
import { ingredientApi } from "./ingredient/ingredient.api";
import { categoryApi } from "./category/category.api";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    auth: authSlice,
    menu: menuSlice,
    ingredient: ingredientSlice,
    category: categorySlice,
    [userApi.reducerPath]: userApi.reducer,
    [menuApi.reducerPath]: menuApi.reducer,
    [ingredientApi.reducerPath]: ingredientApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      menuApi.middleware,
      ingredientApi.middleware,
      categoryApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain "useDispatch" and "useSelector"
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
