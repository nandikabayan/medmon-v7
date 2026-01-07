import axiosIns from '@/shared/api/axios';
import { i } from 'node_modules/unplugin-auto-import/dist/types-yRPzhWtG.mjs';

/** DTO dari backend */
export interface LoginResponseDTO {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user_data: {
    access: string[],
    email: string;
    full_name: string;
    id: string;
    phone: string;
    project_id: number | null;
    role: number | null;
    username: string | null;
  };
}

/** payload login */
export interface LoginPayload {
  username: string;
  password: string;
  remember_me: string;
}

export async function loginApi(
  payload: LoginPayload
): Promise<LoginResponseDTO> {
  const form_data = new FormData();
  Object.entries({
    username: payload.username,
    password: payload.password,
    remember_me: payload.remember_me,
  }).forEach(([key, value]) => {
    form_data.append(key, value)
  });

  const response = await axiosIns.post("/be-auth/login", form_data);
  return response.data;
}
