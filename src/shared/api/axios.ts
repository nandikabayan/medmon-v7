import { stateManagement } from "@/app/store/app-store";
import type { InternalAxiosRequestConfig } from "axios";
import { refreshTokenInterceptor } from "@/shared/api/interceptors/refresh-token-interceptor";
import axios from "axios";

// VARIABLE
const store = stateManagement();

// SET AXIOS DOMAIN
const axiosIns = axios.create({
  baseURL: import.meta.env.VITE_API_DOMAIN,
});

// SET REQUEST HEADER
axiosIns.interceptors.request.use((config: InternalAxiosRequestConfig ) => {
  const token = store.getAccessToken;
  if (config.headers) {
    if (token) config.headers.Authorization = `Bearer ${token}`;

    config.headers.set('content-lang', store.getLanguage.toUpperCase());
  }

  return config;
});

refreshTokenInterceptor(axiosIns);

export default axiosIns;