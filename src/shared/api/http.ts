import type { AxiosRequestConfig } from 'axios';
import { axiosInstance } from './axios';

export async function http<T>(
  config: AxiosRequestConfig
): Promise<T> {
  const response = await axiosInstance.request<T>(config);
  return response.data;
}
