import * as player from "./player/state";
import * as stream from "./player/stream/state";
import * as sf from "./player/sf/state";

export type State = {
  player: player.State;
  sfPlayer: sf.State;
  streamPlayer: stream.State;
};
