import axiosIns from '@/shared/api/axios';
import { stateManagement } from '@/app/store/app-store';

export async function verifyTokenGuard(): Promise<boolean> {
  const store = stateManagement();

  try {
    store.loadingHandler(true);
    await axiosIns.get('be-auth/verify');
    return true;
  } catch {
    store.logoutHandler();
    return false;
  } finally {
    store.loadingHandler(false);
  }
}