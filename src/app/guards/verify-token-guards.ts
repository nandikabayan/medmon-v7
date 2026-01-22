import { verifyTokenApi } from '@/app/services/auth-service';
import { stateManagement } from '@/app/store/app-store';
import type { NormalizedApiError } from '@/shared/api/interceptors/error-interceptor';

export async function verifyTokenGuard(): Promise<boolean> {
  const store = stateManagement();

  try {
    store.loadingHandler(true);
    await verifyTokenApi();
    return true;
  } catch (error) {
    const err = error as NormalizedApiError;

    if (err.status === 401) {
      store.logoutHandler();
    }

    return false;
  } finally {
    store.loadingHandler(false);
  }
}

