import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./state";

export type PlayInput = {
  streamUrl: string;
};

const slice = createSlice({
  name: "streamPlayer",
  initialState: initialState,
  reducers: {
    pause(state) {
      state.playbackState = "not-playing";
    },
    play(state, action: PayloadAction<PlayInput>) {
      state.playbackState = "playing";
      state.streamUrl = action.payload.streamUrl;
    },
    resume(state) {
      if (!state.streamUrl) return;
      state.playbackState = "playing";
    },
  },
});

export const { pause, play, resume } = slice.actions;
export default slice.reducer;
