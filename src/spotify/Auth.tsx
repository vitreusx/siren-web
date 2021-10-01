import React from "react";
import { FetchSpotifyStatus } from "../api/types";
import { gql, useQuery } from "@apollo/client";

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
      <p>Token: {props.token}</p>
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
  const data = useQuery<FetchSpotifyStatus>(gql`
    query FetchSpotifyStatus {
      me {
        sfAccessToken
      }
    }
  `).data;

  const sfLoggedIn = data?.me?.sfAccessToken != null;
  console.log(data);

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
