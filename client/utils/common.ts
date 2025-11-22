import { AxiosError } from 'axios';

export const getErrorMessage = (error: unknown | any): string => {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || error.message || 'Network error';
  }
  if (error instanceof Error) {
    return error.message;
  }
  return error?.message ?? 'An unexpected error occurred';
};
