import authAxios from "../lib/authAxios.js";

const getPromptTemplateList = () => {
  return authAxios.get("http://localhost:3001/prompt-template/list");
};

export { getPromptTemplateList };

// import axios from "axios";

// const getPromptTemplateList = () => {
//   return axios.get("http://localhost:3001/prompt-template/list");
// };

// export { getPromptTemplateList };
