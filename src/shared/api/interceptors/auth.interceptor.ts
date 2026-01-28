import type { InternalAxiosRequestConfig } from 'axios';

type GetTokenFn = () => string | null;

let getToken: GetTokenFn | null = null;
let language: string | null = null;

export function setupAuthInterceptor(
  tokenFn: GetTokenFn,
  lang?: string | null
) {
  getToken = tokenFn;
  language = lang ?? null;
}

export function authInterceptor(
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig {

  // Authorization
  if (typeof getToken === 'function') {
    const token = getToken();
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }
  }

  // Language (static)
  if (language) {
    config.headers.set('content-lang', language.toUpperCase());
  }

  return config;
}
