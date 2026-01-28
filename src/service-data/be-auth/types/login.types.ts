export interface LoginPayload {
  username: string;
  password: string;
  remember_me: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user_data?: Record<string, any>;
}