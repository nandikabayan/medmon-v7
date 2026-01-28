import type { AxiosError } from 'axios';

type RefreshFn = () => Promise<void>;

let refreshToken: RefreshFn | null = null;

export function setupRefreshToken(fn: RefreshFn) {
  refreshToken = fn;
}

export async function refreshTokenInterceptor(
  error: AxiosError
) {
  if (error.response?.status === 401 && refreshToken) {
    await refreshToken();
  }
  return Promise.reject(error);
}