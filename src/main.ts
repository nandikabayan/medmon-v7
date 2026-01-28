import { createApp } from 'vue';

import App from '@/App.vue';
import { pinia } from '@/app/store';
import router from '@/app/router';

import { initApp } from '@/app/init';

const app = createApp(App);

// CORE PLUGINS
app.use(pinia);
app.use(router);

// INIT GLOBAL SIDE EFFECT
initApp(app);

// MOUNT
app.mount('#app');
