import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
} from 'axios';

type RefreshFn = () => Promise<string | null>;

let refreshTokenFn: RefreshFn | null = null;

export function setupRefreshToken(fn: RefreshFn) {
  refreshTokenFn = fn;
}

export function createRefreshTokenInterceptor(
  axios: AxiosInstance
) {
  return async function refreshTokenInterceptor(
    error: AxiosError
  ) {
    const originalRequest = error.config as
      | (AxiosRequestConfig & { _retry?: boolean })
      | undefined;

    if (
      error.response?.status === 401 &&
      refreshTokenFn &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const newAccessToken = await refreshTokenFn();

      if (!newAccessToken) {
        return Promise.reject(error);
      }

      originalRequest.headers = {
        ...originalRequest.headers,
        Authorization: `Bearer ${newAccessToken}`,
      };

      return axios(originalRequest);
    }

    return Promise.reject(error);
  };
}
