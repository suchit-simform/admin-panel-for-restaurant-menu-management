import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "src/store/features/counterSlice";
import { userApi } from "src/store/api/userApi";
import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authSlice from "./features/authSlice";
import { menuApi } from "./menu/menu.api";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    auth: authSlice,
    [userApi.reducerPath]: userApi.reducer,
    [menuApi.reducerPath]: menuApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware, menuApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain "useDispatch" and "useSelector"
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
