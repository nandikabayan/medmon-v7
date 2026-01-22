import { http } from '@/shared/api';

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
  const form_data = new FormData()

  form_data.append('username', payload.username);
  form_data.append('password', payload.password);
  form_data.append('remember_me', String(payload.remember_me));

  // const response = await axiosIns.post("/be-auth/login", form_data);
  return http<LoginResponseDTO>({
    url: '/be-auth/login',
    method: 'POST',
    data: form_data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}