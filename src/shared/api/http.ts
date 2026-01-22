import type { AxiosRequestConfig } from 'axios';
import { axiosInstance } from '@/shared/api/axios';

export async function http<T>(
  config: AxiosRequestConfig
): Promise<T> {
  const response = await axiosInstance.request<T>(config);
  return response.data;
}
