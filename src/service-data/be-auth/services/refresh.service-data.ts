import { http } from '@/shared/api';

export type RefreshTokenResponse = {
  access_token: string;
  refresh_token: string;
};

export async function requestRefreshToken(
  refresh_token: string,
  user_id: string
): Promise<RefreshTokenResponse> {
  const res = await http<RefreshTokenResponse>({
    method: 'POST',
    url: 'be-auth/refresh-token',
    data: {
      refresh_token,
      user_id,
    },
  });

  return res;
}
