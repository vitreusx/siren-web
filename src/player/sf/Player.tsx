import { Helmet } from "react-helmet";
import { gql, useQuery } from "@apollo/client";
import { GetAccessToken } from "./__generated__/GetAccessToken";
import { useEffect, useState } from "react";
import store from "../../store";
import { State } from "../../state";
import { useSelector } from "react-redux";
import { onSdkReady, setDeviceId, setAccessToken } from "./slice";

const GET_ACCESS_TOKEN = gql`
  query GetAccessToken {
    me {
      sfAccessToken
    }
  }
`;

const Player = () => {
  const [player, setPlayer] = useState<Spotify.Player | undefined>(undefined);
  const { sdkReady } = useSelector((state: State) => state.sfPlayer);
  const data = useQuery<GetAccessToken>(GET_ACCESS_TOKEN).data;
  const accessToken = data?.me?.sfAccessToken;

  useEffect(() => {
    if (!accessToken) return;
    store.dispatch(setAccessToken({ accessToken: accessToken! }));
  }, [accessToken]);

  window.onSpotifyWebPlaybackSDKReady = () => {
    store.dispatch(onSdkReady());
  };

  useEffect(() => {
    if (!sdkReady || !accessToken) {
      setPlayer(undefined);
    } else {
      setPlayer(
        new Spotify.Player({
          name: "Siren",
          getOAuthToken: (cb) => cb(accessToken!),
          volume: 0.5,
        })
      );
    }
  }, [sdkReady, accessToken]);

  useEffect(() => {
    if (!player) return;

    player!.addListener("ready", ({ device_id }) => {
      store.dispatch(setDeviceId({ deviceId: device_id }));
    });

    player!.addListener("not_ready", (inst) => {
      store.dispatch(setDeviceId({ deviceId: undefined }));
    });

    player!.connect();
  }, [player]);

  return (
    <Helmet>
      <script src="https://sdk.scdn.co/spotify-player.js" async={true} />
    </Helmet>
  );
};

export default Player;
