import { createRouter, createWebHistory } from 'vue-router';
import routes from 'virtual:generated-pages';

import { middleware } from './middleware/rules.middleware';

const skipVerifyRoutes = ['login', 'archive', 'view'];
const extraRoutes = [
  {
    path: '/',
    name: 'index',
    redirect: { path: 'dashboard' },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...routes, ...extraRoutes],
});

router.beforeEach(async (to, from, next) => {

  if (to.path === '/error-404') {
    return next();
  }

  const isPermitted = middleware.isPermitted(to.path);
  
  if (!isPermitted) {
    return next({ path: 'error-404' });
  }

  // SCROLL TO TOP
  if (to.name !== from.name) {
    setTimeout(() => window.scrollTo(0, 0), 100);
  }

  // VERIFY TOKEN (SKIP SOME ROUTES)
  if (!skipVerifyRoutes.includes(String(to.name))) {
    const verified = await middleware.verifyToken();
    if (!verified) {
      middleware.logout();
      return next({ name: 'login' });
    }
  }

  next();
});

router.afterEach((to) => {
  document.title = `- | Online Media Monitoring`;
});

export default router;