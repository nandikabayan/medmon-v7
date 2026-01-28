import type { App } from 'vue';

import { initApi } from './api.init';
import { initAnalytics } from './analytics.init';
import { initUI } from './ui.init';

export function initApp(app: App) {
    initUI(app);
    initApi();
    initAnalytics(app);
}
