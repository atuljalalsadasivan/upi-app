const AUTH_TOKEN_KEY = 'globalpay.accessToken';

export const authStorage = {
  getToken(): string | null {
    if (typeof window === 'undefined') {
      return null;
    }

    return window.sessionStorage.getItem(AUTH_TOKEN_KEY);
  },

  setToken(token: string): void {
    window.sessionStorage.setItem(AUTH_TOKEN_KEY, token);
  },

  clearToken(): void {
    window.sessionStorage.removeItem(AUTH_TOKEN_KEY);
  }
};
