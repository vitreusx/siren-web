import React, { useState, FormEventHandler } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import store, { State } from "../store";
import { fetchStatus } from "./slice";
import styles from "./Auth.module.css";
import SpotifyAuth from "../spotify/Auth";

const Register = () => {
  const [usernameField, setUsernameField] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <h2>Register</h2>
      <form method="POST" action="/auth/user/register">
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

const LogIn = () => {
  const [usernameField, setUsernameField] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  return (
    <div>
      <h2>Log in</h2>
      <form method="POST" action="/auth/user/login">
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

const LogOut = () => {
  return (
    <div>
      <form method="POST" action="/auth/user/logout">
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

const LoggedIn = () => {
  return (
    <>
      <h3 className={styles.LoggedIn}>Logged in</h3>
      <hr />
      <SpotifyAuth />
      <hr />
      <LogOut />
    </>
  );
};

const Auth = () => {
  const auth = useSelector((state: State) => state.auth);

  useEffect(() => {
    (async () => {
      await store.dispatch(fetchStatus());
    })();
  }, []);

  return (
    <div>
      <h2>Account</h2>
      {auth.loggedIn ? <LoggedIn /> : <LoggedOut />}
    </div>
  );
};

export default Auth;
