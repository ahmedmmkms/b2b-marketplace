import type { AxiosError } from 'axios';
import { toast } from 'sonner';

type ProblemDetails = {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
  errors?: Record<string, string[]>;
};

export class ApiError extends Error {
  status?: number;
  title?: string;
  detail?: string;
  instance?: string;
  errors?: Record<string, string[]>;
  cause?: unknown;

  constructor(init: Partial<ApiError>) {
    super(init.detail ?? init.title ?? 'Unexpected API error');
    this.name = 'ApiError';
    this.status = init.status;
    this.title = init.title;
    this.detail = init.detail;
    this.instance = init.instance;
    this.errors = init.errors;
    this.cause = init.cause;
  }
}

const formatProblem = (problem: ProblemDetails | undefined, status?: number): ApiError => {
  if (!problem) {
    return new ApiError({
      status,
      title: 'Unknown error',
      detail: 'The server returned an unexpected response.',
    });
  }

  return new ApiError({
    status: problem.status ?? status,
    title: problem.title,
    detail: problem.detail,
    instance: problem.instance,
    errors: problem.errors,
  });
};

export const toApiError = (error: unknown): ApiError => {
  if (error instanceof ApiError) {
    return error;
  }

  const axiosError = error as AxiosError<ProblemDetails>;
  if (axiosError?.isAxiosError) {
    return formatProblem(axiosError.response?.data, axiosError.response?.status);
  }

  if (error instanceof Error) {
    return new ApiError({ detail: error.message, cause: error });
  }

  return new ApiError({ detail: 'Unexpected error' });
};

export const surfaceApiError = (error: unknown, fallback = 'Something went wrong'): void => {
  const apiError = toApiError(error);
  toast.error(apiError.title ?? fallback, {
    description: apiError.detail ?? fallback,
  });
};
