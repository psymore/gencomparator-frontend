import authAxios from "../lib/authAxios.js";

const saveKey = apiKeys => {
  return authAxios.post("http://localhost:3001/api-key", apiKeys);
};

const getKey = () => {
  return authAxios.get("http://localhost:3001/api-key/list");
};

export { saveKey, getKey };
