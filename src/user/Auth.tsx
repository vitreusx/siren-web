import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import styles from "./Auth.module.css";
import SpotifyAuth from "../spotify/Auth";
import Library from "../library/Library";
import { FetchUserStatus } from "./__generated__/FetchUserStatus";

const REGISTER_PATH = `${process.env.REACT_APP_AUTH_SERVER}/auth/user/register`;

const Register = () => {
  const [usernameField, setUsernameField] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <h2>Register</h2>
      <form method="POST" action={REGISTER_PATH}>
        <input name="redirect" type="hidden" value={window.location.href} />
        <label>
          Username:{" "}
          <input
            name="username"
            type="text"
            value={usernameField}
            onChange={(e) => setUsernameField(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

const LOGIN_PATH = `${process.env.REACT_APP_AUTH_SERVER}/auth/user/login`;

const LogIn = () => {
  const [usernameField, setUsernameField] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  return (
    <div>
      <h2>Log in</h2>
      <form method="POST" action={LOGIN_PATH}>
        <input name="redirect" type="hidden" value={window.location.href} />
        <label>
          Username:{" "}
          <input
            name="username"
            type="text"
            value={usernameField}
            onChange={(e) => setUsernameField(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <label>
          Remember:
          <input
            name="remember"
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
        </label>
        <br />
        <input type="submit" value="Log in" />
      </form>
    </div>
  );
};

const LOGOUT_PATH = `${process.env.REACT_APP_AUTH_SERVER}/auth/user/logout`;

const LogOut = () => {
  return (
    <div>
      <form method="POST" action={LOGOUT_PATH}>
        <input name="redirect" type="hidden" value={window.location.href} />
        <input type="submit" value="Log out" />
      </form>
    </div>
  );
};

const LoggedOut = () => (
  <>
    <h3 className={styles.NotLoggedIn}>Not logged in</h3>
    <LogIn />
    <Register />
  </>
);

const LoggedIn = (props: { username: string }) => {
  return (
    <>
      <h3 className={styles.LoggedIn}>Logged in</h3>
      <p>Username: {props.username}</p>
      <hr />
      <SpotifyAuth />
      <hr />
      <Library />
      <hr />
      <LogOut />
    </>
  );
};

const FETCH_USER_STATUS = gql`
  query FetchUserStatus {
    me {
      username
    }
  }
`;

const Auth = () => {
  const data = useQuery<FetchUserStatus>(FETCH_USER_STATUS).data;

  const loggedIn = data?.me != null;

  return (
    <div>
      <h2>Account</h2>
      {loggedIn ? <LoggedIn username={data!.me!.username} /> : <LoggedOut />}
    </div>
  );
};

export default Auth;
