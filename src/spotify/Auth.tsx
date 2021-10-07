import React from "react";
import { FetchSpotifyStatus } from "./__generated__/FetchSpotifyStatus";
import { gql, useQuery } from "@apollo/client";
import styles from "./Auth.module.css";

const LogIn = () => {
  return (
    <form method="POST" action="/auth/spotify/login">
      <input type="hidden" name="redirect" value={window.location.href} />
      <input type="submit" value="Log in to Spotify" />
    </form>
  );
};

const LogOut = () => {
  return (
    <form method="POST" action="/auth/spotify/logout">
      <input type="hidden" name="redirect" value={window.location.href} />
      <input type="submit" value="Log out of Spotify" />
    </form>
  );
};

const LoggedIn = (props: { token: string }) => {
  return (
    <div>
      <p className={styles.AuthToken}>
        Token: <code>{props.token}</code>
      </p>
      <LogOut />
    </div>
  );
};

const LoggedOut = () => {
  return (
    <div>
      <LogIn />
    </div>
  );
};

const Auth = () => {
  const FETCH_SPOTIFY_STATUS = gql`
    query FetchSpotifyStatus {
      me {
        sfAccessToken
      }
    }
  `;

  const data = useQuery<FetchSpotifyStatus>(FETCH_SPOTIFY_STATUS).data;

  const sfLoggedIn = data?.me?.sfAccessToken != null;

  return (
    <div>
      <h3>Spotify</h3>
      {sfLoggedIn ? (
        <LoggedIn token={data!.me!.sfAccessToken!} />
      ) : (
        <LoggedOut />
      )}
    </div>
  );
};

export default Auth;
