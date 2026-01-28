import type { InternalAxiosRequestConfig } from 'axios';

type GetTokenFn = () => string | null;
type GetLanguageFn = () => string | null;

let getToken: GetTokenFn | null = null;
let getLanguage: GetLanguageFn | null = null;

export function setupAuthInterceptor(
  tokenFn: GetTokenFn,
  languageFn: GetLanguageFn
) {
  getToken = tokenFn;
  getLanguage = languageFn;
}

export function authInterceptor(
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig {
  // Authorization
  if (getToken) {
    const token = getToken();
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }
  }

  // Language header
  if (getLanguage) {
    const lang = getLanguage();
    if (lang) {
      config.headers.set('content-lang', lang.toUpperCase());
    }
  }

  return config;
}
