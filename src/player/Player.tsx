import React from "react";
import SfPlayer from "./sf/Player";
import StreamPlayer from "./stream/Player";

const Player = () => {
  return (
    <div>
      <SfPlayer />
      <StreamPlayer />
    </div>
  );
};

export default Player;
