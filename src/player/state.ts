export type State = {
  curType: "sf" | "stream" | undefined;
};

export const initialState: State = {
  curType: undefined,
};
