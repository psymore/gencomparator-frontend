// import authAxios from "../lib/authAxios.js";

// const createAndSendPrompt = async parameters => {
//   return authAxios.post(
//     "http://localhost:3001/prompt-create-and-send",
//     parameters
//   );
// };

// const getPrompts = () => {
//   return authAxios.get("http://localhost:3001/prompt/list");
// };

// export { getPrompts, createAndSendPrompt };

import axios from "axios";

const createAndSendPrompt = async parameters => {
  return axios.post("http://localhost:3001/prompt-create-and-send", parameters);
};

const getPrompts = () => {
  return axios.get("http://localhost:3001/prompt/list");
};

export { getPrompts, createAndSendPrompt };
