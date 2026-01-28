import type { InternalAxiosRequestConfig } from 'axios';

type GetTokenFn = () => string | null;
type GetLanguageFn = () => string | null;

let getToken: GetTokenFn | null = null;
let getLanguage: GetLanguageFn | null = null;

export function setupAuthInterceptor(
  tokenFn: GetTokenFn,
  languageFn?: GetLanguageFn
) {
  getToken = tokenFn;
  getLanguage = languageFn ?? null;
}

export function authInterceptor(
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig {
  if (getToken) {
    const token = getToken();
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }
  }

  if (getLanguage) {
    const lang = getLanguage();
    if (lang) {
      config.headers.set('content-lang', lang.toUpperCase());
    }
  }

  return config;
}
