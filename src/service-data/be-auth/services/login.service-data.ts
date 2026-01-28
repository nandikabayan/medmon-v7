import { http } from '@/shared/api';
import { encryptPasswordUtil } from "@/shared/utils/encryption.util";
import type { LoginPayload, LoginResponse } from '../types/login.types';

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const encryptedPassword = encryptPasswordUtil(payload.password);

  const formData = new FormData();
  formData.append('username', payload.username);
  formData.append('password', encryptedPassword);
  formData.append('remember_me', payload.remember_me);

  return http<LoginResponse>({
    method: 'POST',
    url: 'be-auth/login',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
