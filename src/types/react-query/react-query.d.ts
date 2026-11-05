import type { ApiError } from 'api/ApiError';

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: ApiError;
  }
}
