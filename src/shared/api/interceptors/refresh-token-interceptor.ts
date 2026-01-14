import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { stateManagement } from '@/app/store/app-store';

export function refreshTokenInterceptor(axiosIns: AxiosInstance) {
  axiosIns.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const store = stateManagement();
      const refresh_token = store.getRefreshToken || '';
      const user_id = store.getUser.id || '';

      if (!refresh_token) {
        store.logoutHandler();
        return Promise.reject(error);
      }
      
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // REQUEST REFRESH TOKEN
          const res = await axiosIns.post('be-auth/refresh-token', {
            refresh_token,
            user_id,
          });

          const { access_token, refresh_token: new_refresh_token } = res.data;

          // SAVE TOKEN
          store.tokenHandler(access_token, new_refresh_token);

          // UPDATE AUTH HEADER
          originalRequest.headers.set(
            'Authorization',
            `Bearer ${access_token}`
          );

          // RETRY ORIGINAL REQUEST
          return axiosIns(originalRequest);
        } catch (err) {
          store.logoutHandler();
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    }
  );
}
