import axios from "axios";
import authAxios from "../lib/authAxios.js";
import { Navigate } from "react-router-dom";

const loginAsync = async data => {
  await axios.post("http://localhost:3001/users/enter", data);
};

const logoutAsync = async () => {
  localStorage.removeItem("token");
  return <Navigate to={"/login"} />;
};

const saveKey = apiKeys => {
  return authAxios.post("http://localhost:3001/api-key", apiKeys);
};

export { loginAsync, logoutAsync, saveKey };
