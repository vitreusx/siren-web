import React from "react";
import Auth from "../user/Auth";
import Player from "../player/Player";
import styles from "./App.module.css";

const App = () => {
  return (
    <div className={styles.App}>
      <div className={styles.Content}>
        <h1 className={styles.Title}>Siren</h1>
        <Auth />
        <Player />
      </div>
    </div>
  );
};

export default App;
