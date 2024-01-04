import authAxios from "../lib/authAxios.js";

const getPromptTemplateList = () => {
  return authAxios.get("http://localhost:3001/prompt-template/list");
};

export { getPromptTemplateList };
