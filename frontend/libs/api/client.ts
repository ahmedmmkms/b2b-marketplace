import axios from 'axios';
import { getApiBaseUrl } from '../utils/env';
import { emitAppEvent } from '../utils/events';
import { mapAxiosError } from '../utils/error';
import { getAuthToken, useAuthStore } from '../store/auth-store';

const client = axios.create({
  baseURL: getApiBaseUrl(),
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

client.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers = config.headers ?? {};
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const apiError = mapAxiosError(error);
    const status = apiError.status ?? error.response?.status;

    if (status === 401 && typeof window !== 'undefined') {
      useAuthStore.getState().clear();
      if (!error.config?.skipAuthRedirect) {
        window.location.href = '/auth/signin';
      }
    }

    if (status && status >= 500) {
      emitAppEvent('http:error', { message: apiError.message });
    }

    return Promise.reject(apiError);
  }
);

export default client;
