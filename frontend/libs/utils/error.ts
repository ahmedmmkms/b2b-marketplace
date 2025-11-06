import type { AxiosError } from 'axios';

export type FieldErrorMap = Record<string, string>;

export interface ApiError {
  message: string;
  status?: number;
  fieldErrors?: FieldErrorMap;
}

export const mapAxiosError = (error: AxiosError): ApiError => {
  const status = error.response?.status;
  const problem = error.response?.data as
    | {
        title?: string;
        detail?: string;
        errors?: Record<string, string[]>;
      }
    | undefined;

  const message =
    problem?.detail ||
    problem?.title ||
    error.message ||
    'An unexpected error occurred.';

  const fieldErrors: FieldErrorMap | undefined = problem?.errors
    ? Object.fromEntries(
        Object.entries(problem.errors).map(([field, messages]) => [field, messages?.[0] ?? message])
      )
    : undefined;

  return { message, status, fieldErrors };
};
