import { setupRefreshToken } from '@/shared/api/interceptors/refresh-token.interceptor';
import { requestRefreshToken } from '@/service-data/be-auth//services/refresh.service-data';
import { stateManagement } from '@/app/store/app.store';

export function initApi() {
  const store = stateManagement();

  setupRefreshToken(async () => {
    try {
      const res = await requestRefreshToken(
        store.getRefreshToken,
        store.getUser.id || ""
      );

      store.tokenHandler(
        res.access_token,
        res.refresh_token
      );

      return res.access_token;
    } catch (error) {
      store.logoutHandler();
      throw error;
    }
  });
}
