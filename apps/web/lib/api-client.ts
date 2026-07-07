import type { AuthResponse, LoginRequest, MeResponse, RegisterRequest } from '@globalpay/shared';
import { authStorage } from './auth-storage';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001';

type ApiClientOptions = {
  token?: string | null;
};

export class ApiClientError extends Error {
  constructor(
    message: string,
    readonly status: number
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

const getErrorMessage = (payload: unknown): string => {
  if (
    typeof payload === 'object' &&
    payload !== null &&
    'error' in payload &&
    typeof payload.error === 'object' &&
    payload.error !== null &&
    'message' in payload.error
  ) {
    return String(payload.error.message);
  }

  return 'Request failed.';
};

const request = async <TResponse>(
  path: string,
  init: RequestInit = {},
  options: ApiClientOptions = {}
): Promise<TResponse> => {
  const headers = new Headers(init.headers);
  headers.set('Content-Type', 'application/json');

  if (options.token) {
    headers.set('Authorization', `Bearer ${options.token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers
  });

  const payload = (await response.json()) as unknown;

  if (!response.ok) {
    throw new ApiClientError(getErrorMessage(payload), response.status);
  }

  return payload as TResponse;
};

export const authApi = {
  register(payload: RegisterRequest): Promise<AuthResponse> {
    return request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  login(payload: LoginRequest): Promise<AuthResponse> {
    return request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  me(): Promise<MeResponse> {
    return request<MeResponse>('/auth/me', {}, { token: authStorage.getToken() });
  }
};
