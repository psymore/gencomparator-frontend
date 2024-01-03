import axios from "axios";
import { jwtDecode } from "jwt-decode";

const instance = axios.create({
  // TODO: When the base url logic fixed change here
  url: "http://localhost:3001",
  timeout: 10000000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

instance.interceptors.request.use(async request => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No valid user info.");
    localStorage.clear();
    window.location.replace("/login");
    return;
  }

  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000; // Convert milliseconds to seconds

  if (decodedToken.exp < currentTime) {
    console.error("Token expired.");
    localStorage.clear();
    window.location.replace("/login");
    return Promise.reject("Token expired");
  }

  request.headers.Authorization = `Bearer ${token}`;
  return request;
});

export default instance;
