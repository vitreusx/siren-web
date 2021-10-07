export type State = {
  playbackState: "playing" | "not-playing" | undefined;
  streamUrl: string | undefined;
};

export const initialState: State = {
  playbackState: undefined,
  streamUrl: undefined,
};
