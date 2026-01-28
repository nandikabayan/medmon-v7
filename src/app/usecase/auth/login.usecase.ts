import { login } from '@/service-data/be-auth/services/login.service-data';
import { stateManagement } from '@/app/store/app.store';
import type { LoginPayload, LoginResponse } from '@/service-data/be-auth/types/login.types';

export function useLogin() {
  const store = stateManagement();
  const loading = ref(false);
  const error = ref<string | null>(null);
  const result = ref<LoginResponse | null>(null);

  async function loginModel(payload: LoginPayload) {
    loading.value = true;
    error.value = null;
    result.value = null;

    try {
      const res = await login(payload);
      result.value = res;
      store.tokenHandler(result.value.access_token, result.value.refresh_token);
    } catch (e: any) {
      error.value = e || 'Login failed';
    } finally {
      loading.value = false;
    }
  }

  return { loading, error, result, loginModel };
}
