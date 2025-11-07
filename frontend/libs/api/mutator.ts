import type { AxiosRequestConfig } from 'axios';
import { axiosInstance } from './http';

export const httpMutator = async <TData = unknown, TVariables = unknown>(
  config: AxiosRequestConfig<TVariables>,
): Promise<TData> => {
  const response = await axiosInstance.request<TData>(config);
  return response.data;
};
