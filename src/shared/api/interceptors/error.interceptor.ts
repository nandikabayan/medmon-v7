import type { AxiosError } from 'axios';

export interface NormalizedApiError {
  status?: number;
  code?: string;
  message: string;
}

export function errorInterceptor(
  error: AxiosError
): Promise<never> {
  const normalizedError: NormalizedApiError = {
    status: error.response?.status,
    code: (error.response?.data as any)?.code,
    message:
      (error.response?.data as any)?.message ??
      (error.response?.data as any)?.detail ??
      error.message ??
      'Unknown error',
  };

  return Promise.reject(normalizedError);
}
