import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as authApi from "../api/user";

export type AuthState = {
  loggedIn: boolean;
};

const initialState: AuthState = {
  loggedIn: false,
};

export const fetchStatus = createAsyncThunk("auth/fetchStatus", authApi.status);

const slice = createSlice({
  name: "account",
  initialState: initialState,
  reducers: {
    logIn(state, action: PayloadAction<void>) {
      state.loggedIn = true;
    },
    logOut(state, action: PayloadAction<void>) {
      state.loggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStatus.fulfilled, (state, action) => {
      const { loggedIn } = action.payload;
      state.loggedIn = loggedIn;
    });
  },
});

export const { logIn, logOut } = slice.actions;
export default slice.reducer;
