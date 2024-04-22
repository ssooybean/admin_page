import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  authEmail: string;
}

const initialState: AuthState = {
  authEmail: "",
};

export const authSlice = createSlice({
  name: "isAuth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<string>) => {
      state.authEmail = action.payload;
    },
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
