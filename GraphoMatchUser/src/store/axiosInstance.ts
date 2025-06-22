import axios from "axios";
import { baseUrl } from "./slices/authSlice";

const axiosInstance = axios.create({
  baseURL: baseUrl, 
});

axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
