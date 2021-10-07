import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { initialState } from "./state";
import * as root from "../../state";

export type PlayInput = {
  trackId: string;
};

export const play = createAsyncThunk(
  "sfPlayer/play",
  async (payload: PlayInput, thunkAPI) => {
    const rootState = thunkAPI.getState() as root.State;
    const state = rootState.sfPlayer;

    const base_url = `https://api.spotify.com/v1/me/player/play`;
    await axios({
      url: `${base_url}/?device_id=${state.deviceId!}`,
      method: "put",
      headers: {
        Authorization: `Bearer ${state.accessToken}`,
      },
      data: {
        uris: [`spotify:track:${payload.trackId}`],
      },
    });
  }
);

export const pause = createAsyncThunk(
  "sfPlayer/pause",
  async (payload, thunkAPI) => {
    const rootState = thunkAPI.getState() as root.State;
    const state = rootState.sfPlayer;

    const base_url = `https://api.spotify.com/v1/me/player/pause`;
    await axios({
      url: `${base_url}/?device_id=${state.deviceId!}`,
      method: "put",
      headers: {
        Authorization: `Bearer ${state.accessToken}`,
      },
    });
  }
);

export const resume = createAsyncThunk(
  "sfPlayer/resume",
  async (payload, thunkAPI) => {
    const rootState = thunkAPI.getState() as root.State;
    const state = rootState.sfPlayer;

    const base_url = `https://api.spotify.com/v1/me/player/play`;
    await axios({
      url: `${base_url}/?device_id=${state.deviceId!}`,
      method: "put",
      headers: {
        Authorization: `Bearer ${state.accessToken}`,
      },
    });
  }
);

const slice = createSlice({
  name: "sfPlayer",
  initialState: initialState,
  reducers: {
    onSdkReady(state) {
      state.sdkReady = true;
    },
    setDeviceId(
      state,
      action: PayloadAction<{ deviceId: string | undefined }>
    ) {
      state.deviceId = action.payload.deviceId;
    },
    setAccessToken(state, action: PayloadAction<{ accessToken: string }>) {
      state.accessToken = action.payload.accessToken;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(play.fulfilled, (state, action) => {
        state.playbackState = "running";
      })
      .addCase(pause.fulfilled, (state, action) => {
        state.playbackState = "not-running";
      })
      .addCase(resume.fulfilled, (state, action) => {
        state.playbackState = "running";
      });
  },
});

export const { onSdkReady, setDeviceId, setAccessToken } = slice.actions;
export default slice.reducer;
