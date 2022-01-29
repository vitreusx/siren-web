import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { State } from "../../state";

const Player = () => {
  const [audio, setAudio] = useState<HTMLAudioElement | undefined>(undefined);
  const [currentStreamUrl, setCurrentStreamUrl] = useState<string | undefined>(
    undefined
  );
  const { playbackState, streamUrl } = useSelector(
    (state: State) => state.streamPlayer
  );

  useEffect(() => {
    (async () => {
      switch (playbackState) {
        case "playing": {
          if (audio) audio!.pause();

          let target: HTMLAudioElement = audio!;
          if (streamUrl !== currentStreamUrl) {
            target = new Audio(streamUrl);
            setAudio(target);
            setCurrentStreamUrl(streamUrl);
          }

          console.log(target);
          await target.play();
          break;
        }
        case "not-playing":
          audio!.pause();
          break;
      }
    })();
  }, [playbackState, streamUrl]);

  return null;
};

export default Player;
