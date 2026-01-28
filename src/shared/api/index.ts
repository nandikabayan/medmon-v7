import { axiosInstance } from '@/shared/api/axios';

import { authInterceptor } from '@/shared/api/interceptors/auth.interceptor';
import { refreshTokenInterceptor } from '@/shared/api/interceptors/refresh-token.interceptor';
import { errorInterceptor } from '@/shared/api/interceptors/error.interceptor';

axiosInstance.interceptors.request.use(authInterceptor);
axiosInstance.interceptors.response.use(
  (res) => res,
  refreshTokenInterceptor
);
axiosInstance.interceptors.response.use(
  (res) => res,
  errorInterceptor
);

export * from '@/shared/api/http';
export * from '@/shared/api/types';
export * from '@/shared/api/interceptors/auth.interceptor';
export * from '@/shared/api/interceptors/refresh-token.interceptor';