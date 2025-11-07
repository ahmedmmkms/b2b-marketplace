import axios from 'axios';
import { getEnv } from '@/libs/config/env';
import { getAccessToken, useAuthStore } from '@/libs/store/auth-store';
import { getDirection } from '@/libs/i18n/config';
import { toApiError, surfaceApiError } from './api-error';

const { apiBaseUrl } = getEnv();

const resolveLocaleFromPath = (): string => {
  if (typeof window === 'undefined') {
    return 'en';
  }
  const segments = window.location.pathname.split('/').filter(Boolean);
  return segments[0] && segments[0].length <= 5 ? segments[0] : 'en';
};

const readCookie = (name: string): string | undefined => {
  if (typeof document === 'undefined') {
    return undefined;
  }
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift();
  }
  return undefined;
};

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  timeout: 25_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const headers = config.headers ?? {};
  const token = getAccessToken();
  if (token) {
    headers.Authorization = headers.Authorization ?? `Bearer ${token}`;
  }

  const csrfToken = readCookie('XSRF-TOKEN');
  if (csrfToken) {
    headers['X-CSRF-Token'] = csrfToken;
  }

  const locale = headers['Accept-Language'] ?? resolveLocaleFromPath();
  headers['Accept-Language'] = locale;
  headers['X-UI-Direction'] = getDirection(String(locale));

  config.headers = headers;
  return config;
});

const redirectToSignIn = () => {
  if (typeof window === 'undefined') {
    return;
  }
  const locale = resolveLocaleFromPath();
  const authStore = useAuthStore.getState();
  authStore.clear();
  const search = new URLSearchParams({ next: window.location.pathname + window.location.search });
  window.location.href = `/${locale}/auth/signin?${search.toString()}`;
};

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError = toApiError(error);
    const config = error?.config ?? {};
    const status = apiError.status ?? error?.response?.status;

    if (status === 401 && !config.skipAuthRedirect) {
      redirectToSignIn();
      return Promise.reject(apiError);
    }

    if (status && status >= 500 && !config.skipErrorToast) {
      surfaceApiError(apiError, 'Server error');
    } else if (!config.skipErrorToast && (apiError.detail || apiError.title)) {
      surfaceApiError(apiError);
    }

    return Promise.reject(apiError);
  },
);

export { axiosInstance };
