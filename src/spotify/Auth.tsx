import React from "react";
import { FormEventHandler } from "react";
import { fetchStatus, logOut } from "./authSlice";
import store, { State } from "../store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
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
  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    await store.dispatch(logOut());
  };

  return (
    <form method="POST" action="/auth/spotify/logout">
      <input type="hidden" name="redirect" value={window.location.href} />
      <input type="submit" value="Log out of Spotify" />
    </form>
  );
};

const LoggedIn = () => {
  return (
    <div>
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
  const userLoggedIn = useSelector((state: State) => state.auth.loggedIn);
  const sfLoggedIn = useSelector((state: State) => state.sf.loggedIn);

  useEffect(() => {
    (async () => {
      store.dispatch(fetchStatus());
    })();
  }, [userLoggedIn]);

  return (
    <div>
      <h3>Spotify</h3>
      {sfLoggedIn ? <LoggedIn /> : <LoggedOut />}
    </div>
  );
};

export default Auth;
