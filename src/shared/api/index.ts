import { axiosInstance } from '@/shared/api/axios';

import { authInterceptor } from './interceptors/auth.interceptor';
import { createRefreshTokenInterceptor } from './interceptors/refresh-token.interceptor';
import { errorInterceptor } from './interceptors/error.interceptor';

// REQUEST
axiosInstance.interceptors.request.use(authInterceptor);

// RESPONSE
axiosInstance.interceptors.response.use(
  (res) => res,
  createRefreshTokenInterceptor(axiosInstance)
);

axiosInstance.interceptors.response.use(
  (res) => res,
  errorInterceptor
);

export * from './http';
export * from './types';
export * from './interceptors/auth.interceptor';
export * from './interceptors/refresh-token.interceptor';
