import type { App } from 'vue';
import { initApi } from './api.init';
import { initAnalytics } from './analytics.init';
import { initUI } from './ui.init';
import { setupAuthInterceptor } from '@/shared/api/interceptors/auth.interceptor';
import { stateManagement } from '@/app/store/app.store';

const store = stateManagement();
export function initApp(app: App) {
    initUI(app);
    initApi();

    // Setup Auth Interceptor   
    setupAuthInterceptor(
        () => store.getAccessToken,
        store.getLanguage
    );

    initAnalytics(app);
}

