import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "src/types/user";

export type AuthState = {
  authToken?: string | null;
  currentUser?: User | null;
};

const initialState: AuthState = {};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleLogin: (state, actions: PayloadAction<AuthState>) => {
      state.authToken = actions.payload.authToken;
      state.currentUser = actions.payload.currentUser;
    },
    handleLogout: (state) => {
      state.authToken = null;
      state.currentUser = null;
    },
  },
});

export const { handleLogin, handleLogout } = authSlice.actions;

export default authSlice.reducer;
