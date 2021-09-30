import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as sfApi from "../api/spotify";

export type SpotifyState = {
  loggedIn: boolean;
};

const initialState: SpotifyState = {
  loggedIn: true,
};

export const fetchStatus = createAsyncThunk(
  "spotify/fetchStatus",
  sfApi.status
);

const slice = createSlice({
  name: "spotify",
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
