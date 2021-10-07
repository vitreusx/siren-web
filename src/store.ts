import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./player/slice";
import sfPlayerReducer from "./player/sf/slice";
import streamPlayerReducer from "./player/stream/slice";

const store = configureStore({
  reducer: {
    player: playerReducer,
    sfPlayer: sfPlayerReducer,
    streamPlayer: streamPlayerReducer,
  },
  devTools: true,
});

export default store;
