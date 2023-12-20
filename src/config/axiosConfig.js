import axios from "axios";

const axiosInstance = axios.create({
  // Your Axios configuration (baseURL, headers, etc.)
  baseURL: "https://your-api-base-url.com",
  // Other configuration options...
});

// Add an interceptor to include the authentication token in requests
const token = localStorage.getItem("authToken"); // Retrieve the token from local storage or context
axiosInstance.interceptors.request.use(
  config => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
