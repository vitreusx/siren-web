import { configureStore } from "@reduxjs/toolkit";
import authReducer, { AuthState } from "./user/slice";
import sfReducer, { SpotifyState } from "./spotify/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    sf: sfReducer,
  },
});

export type State = {
  auth: AuthState;
  sf: SpotifyState;
};

export default store;
