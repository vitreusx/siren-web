export type State = {
  accessToken: string | undefined;
  sdkReady: boolean;
  deviceId: string | undefined;
  playbackState: "not-running" | "running" | undefined;
};

export const initialState: State = {
  accessToken: undefined,
  sdkReady: false,
  deviceId: undefined,
  playbackState: undefined,
};
