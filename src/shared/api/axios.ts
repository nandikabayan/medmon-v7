import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_DOMAIN,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});