import { stateManagement } from '@/app/store/app-store';
import { createRouter, createWebHistory } from "vue-router";
import routes from "virtual:generated-pages";

import { isRoutesPermitted } from "@/app/router/rules-routes";
import { verifyTokenGuard } from '@/shared/api/interceptors/verify-interceptor';

const extraRoutes = [
  {
    path: '/',
    name: 'index',
    redirect: (to) => {
      return { path: "dashboard" };
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...routes,
    ...extraRoutes
  ]
})

router.beforeEach(async (to, from, next) => {
  const store = stateManagement();

  if (to.path === '/error-404') {
    return next();
  }

  // CHECK PERMISSION
  const isPermitted = isRoutesPermitted(
    store.getUser,
    store.project ,
    to.path
  );

  if (!isPermitted) {
    return next({ path: 'error-404' });
  }

  // SCROLL TO TOP
  if (to.name !== from.name) {
    setTimeout(() => window.scrollTo(0, 0), 100);
  }

  // VERIFY TOKEN (SKIP SOME ROUTES)
  const skipVerifyRoutes = ['login', 'archive', 'view'];

  if (!skipVerifyRoutes.includes(String(to.name))) {
    const verified = await verifyTokenGuard();
    if (!verified) {
      return next({ name: 'login' });
    }
  }

  next();
})

router.afterEach((to) => {
  // document.title = `${handlerBilingual(to.meta.title)} | Online Media Monitoring`;
});

export default router;
