import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { FormEventHandler } from "react";
import { GetUserId } from "./__generated__/GetUserId";
import { GetUserTracks } from "./__generated__/GetUserTracks";
import * as player from "../player/slice";
import * as sf from "../player/sf/slice";
import * as stream from "../player/stream/slice";
import store from "../store";

const ADD_SF_TRACK = gql`
  mutation AddSfTrack($input: AddSfTrackInput!) {
    addSfTrack(input: $input) {
      id
    }
  }
`;

const ADD_YT_TRACK = gql`
  mutation AddYtTrack($input: AddYtTrackInput!) {
    addYtTrack(input: $input) {
      id
    }
  }
`;

const GET_USER_ID = gql`
  query GetUserId {
    me {
      id
    }
  }
`;

const GET_USER_TRACKS = gql`
  query GetUserTracks {
    me {
      tracks {
        id
        title
        source {
          __typename
          ... on YtAudio {
            videoUrl
            streamUrl
          }
          ... on SfTrack {
            trackId
          }
        }
      }
    }
  }
`;

const Tracks = () => {
  const { loading, error, data } = useQuery<GetUserTracks>(GET_USER_TRACKS);

  if (loading) return <p>"Loading"</p>;
  if (error) return <p>"Error"</p>;

  return (
    <div>
      <h4>Tracks</h4>
      <ul>
        {data?.me?.tracks?.map((track) => (
          <li key={track.id}>
            <button
              onClick={async (e) => {
                switch (track.source.__typename) {
                  case "SfTrack":
                    const sfInput: sf.PlayInput = {
                      trackId: track.source.trackId,
                    };
                    await store.dispatch(
                      player.play({
                        player: "sf",
                        input: sfInput,
                      })
                    );
                    break;
                  case "YtAudio":
                    const streamInput: stream.PlayInput = {
                      streamUrl: track.source.streamUrl,
                    };
                    await store.dispatch(
                      player.play({
                        player: "stream",
                        input: streamInput,
                      })
                    );
                    break;
                }
              }}
            >
              Play
            </button>
            {track.title}
          </li>
        ))}
      </ul>
      <button onClick={(e) => store.dispatch(player.pause())}>Pause</button>
      <button onClick={(e) => store.dispatch(player.resume())}>Resume</button>
    </div>
  );
};

const AddTrack = () => {
  const [trackType, setTrackType] = useState<"sf" | "yt">("sf");
  const [title, setTitle] = useState("");
  const [trackLink, setTrackLink] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const userId = useQuery<GetUserId>(GET_USER_ID).data?.me?.id;

  const addSfTrack = useMutation(ADD_SF_TRACK, {
    variables: {
      input: {
        userId: userId,
        title: title,
        trackLink: trackLink,
      },
    },
    refetchQueries: [GET_USER_TRACKS],
  })[0];

  const addYtTrack = useMutation(ADD_YT_TRACK, {
    variables: {
      input: {
        userId: userId,
        title: title,
        videoUrl: videoUrl,
      },
    },
    refetchQueries: [GET_USER_TRACKS],
  })[0];

  const AddSfTrack = (
    <>
      <label>
        Track link:
        <input
          type="url"
          value={trackLink}
          onChange={(e) => setTrackLink(e.target.value)}
        />
      </label>
    </>
  );

  const AddYtTrack = (
    <>
      <label>
        Video URL:
        <input
          type="url"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
      </label>
    </>
  );

  const trackDataMap = {
    sf: AddSfTrack,
    yt: AddYtTrack,
  };

  const mutationMap = {
    sf: addSfTrack,
    yt: addYtTrack,
  };

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    await mutationMap[trackType]();
  };

  return (
    <div>
      <h4>Add track</h4>
      <form onSubmit={onSubmit}>
        <label>
          Track type:
          <select
            value={trackType}
            onChange={(e) => setTrackType(e.target.value as "sf" | "yt")}
          >
            <option value="sf">Spotify</option>
            <option value="yt">Youtube</option>
          </select>
        </label>
        <br />
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        {trackDataMap[trackType]} <br />
        <input type="submit" value="Add track" />
      </form>
    </div>
  );
};

const Library = () => {
  return (
    <div>
      <h3>Library</h3>
      <Tracks />
      <AddTrack />
    </div>
  );
};

export default Library;
