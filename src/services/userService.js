import axios from "axios";
import authAxios from "../lib/authAxios.js";

const loginAsync = async data => {
  await axios.post("http://localhost:3001/users/enter", data);
};

const logoutAsync = () => {};

const saveKey = apiKeys => {
  return authAxios.post("http://localhost:3001/api-key", apiKeys);
};

export { loginAsync, logoutAsync, saveKey };
