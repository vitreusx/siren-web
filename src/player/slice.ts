import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as stream from "./stream/slice";
import * as sf from "./sf/slice";
import { initialState } from "./state";
import * as root from "../state";

export const pause = createAsyncThunk(
  "player/pause",
  async (data, thunkAPI) => {
    const rootState = thunkAPI.getState() as root.State;
    const state = rootState.player;

    switch (state.curType) {
      case "sf":
        thunkAPI.dispatch(sf.pause());
        break;
      case "stream":
        thunkAPI.dispatch(stream.pause());
        break;
    }
  }
);

type PlayInput = {
  player: "sf" | "stream";
  input: stream.PlayInput | sf.PlayInput;
};

export const play = createAsyncThunk(
  "player/play",
  async (data: PlayInput, thunkAPI) => {
    await thunkAPI.dispatch(pause());

    switch (data.player) {
      case "sf":
        await thunkAPI.dispatch(sf.play(data.input as sf.PlayInput));
        break;
      case "stream":
        thunkAPI.dispatch(stream.play(data.input as stream.PlayInput));
        break;
    }

    return data;
  }
);

export const resume = createAsyncThunk(
  "player/resume",
  async (data, thunkAPI) => {
    const rootState = thunkAPI.getState() as root.State;
    const state = rootState.player;

    switch (state.curType) {
      case "sf":
        await thunkAPI.dispatch(sf.resume());
        break;
      case "stream":
        thunkAPI.dispatch(stream.resume());
        break;
    }
  }
);

const slice = createSlice({
  name: "player",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(play.fulfilled, (state, action) => {
      state.curType = action.payload.player;
    });
  },
});

export default slice.reducer;
