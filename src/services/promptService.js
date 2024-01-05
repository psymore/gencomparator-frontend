import authAxios from "../lib/authAxios.js";

const createAndSendPrompt = async parameters => {
  return authAxios.post(
    "http://localhost:3001/prompt-create-and-send",
    parameters
  );
};

// const sendPromptToLlm = async () => {
//   return authAxios.post("http://localhost:3001/prompt-to-llm");
// };

const getPrompts = () => {
  return authAxios.get("http://localhost:3001/prompt/list");
};

const getResponse = () => {
  return authAxios.get("http://localhost:3001/prompt/response");
};

export { getPrompts, getResponse, createAndSendPrompt };
