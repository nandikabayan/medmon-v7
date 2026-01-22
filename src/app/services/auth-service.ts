import { http } from '@/shared/api';

export function verifyTokenApi(): Promise<void> {
  return http<void>({
    url: '/be-auth/verify',
    method: 'GET',
  });
}
