import axios, { type AxiosError } from 'axios';
import { env } from 'config/env';
import { ApiError } from './ApiError';

interface ErrorResponseBody {
  success: false;
  message: string;
  code?: string;
  details?: { field: string; message: string }[];
}

export const httpClient = axios.create({
  baseURL: env.apiUrl,
  timeout: 15_000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ErrorResponseBody>) => {
    const body = error.response?.data;

    return Promise.reject(
      new ApiError(
        error.response?.status ?? 0,
        body?.message ?? 'Não foi possível conectar ao servidor.',
        body?.code,
        body?.details,
      ),
    );
  },
);
