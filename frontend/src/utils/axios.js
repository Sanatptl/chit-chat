import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:3004/api"
      : "/api",
  withCredentials: true,
  // timeout: 5000, // Set a timeout of 2seconds
});

export default axiosInstance;
