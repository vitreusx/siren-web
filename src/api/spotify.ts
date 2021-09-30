import axios from "axios";

export type Status = {
  loggedIn: boolean;
};

export const status = async () => {
  const resp = await axios("/auth/spotify/status");
  return { loggedIn: resp.data.logged_in };
};
