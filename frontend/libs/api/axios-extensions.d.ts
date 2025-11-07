import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    skipAuthRedirect?: boolean;
    skipErrorToast?: boolean;
  }
}
