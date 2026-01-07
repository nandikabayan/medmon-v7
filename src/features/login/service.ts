import { loginApi } from "@/features/login/api";
import { mapUserDtoToUser } from "@/features/login/mapper";
import { stateManagement } from "@/app/store/app-store";

interface LoginParams {
  username: string;
  password: string;
  remember_me: string;
}

export async function loginService(params: LoginParams) {
  const store = stateManagement();

  const dto = await loginApi(params);
  const user = mapUserDtoToUser(dto.user_data);

  // simpan ke store
  store.tokenHandler(dto.access_token, dto.refresh_token);

  return user;
}
