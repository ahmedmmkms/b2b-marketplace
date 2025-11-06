import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import client from './client';

export const orvalMutator = <T = unknown>(
  config: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return client.request<T, AxiosResponse<T>>(config);
};

export default orvalMutator;
