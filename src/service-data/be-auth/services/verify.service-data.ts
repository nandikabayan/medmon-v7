import { http } from '@/shared/api';

export async function verifyAuthToken(): Promise<boolean> {
  try {
    await http({
      method: 'GET',
      url: 'be-auth/verify',
    });
    return true;
  } catch {
    return false;
  }
}
