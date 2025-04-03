import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../state/store";

export interface AuthState {
  username: string | null;
}

const initialState: AuthState = {
  username: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    userLoggedOut: (state) => {
      state.username = null;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUsername = (state: RootState) => state.auth.username;
