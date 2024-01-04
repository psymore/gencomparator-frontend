import authAxios from "../lib/authAxios.js";

const createPrompt = parameters => {
  return authAxios.post("http://localhost:3001/prompt", parameters);
};

const getPrompt = () => {
  return authAxios.get("http://localhost:3001/prompt/list");
};

export { createPrompt, getPrompt };
