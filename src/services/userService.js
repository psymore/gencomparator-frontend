import axios from "axios";

const loginAsync = async data => {
  await axios.post("http://localhost:3001/users/enter", data);
};
const logoutAsync = async () => {
  localStorage.removeItem("token");
  window.location.href = "http://localhost:3000/login";
};
export { loginAsync, logoutAsync };
