import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const Layout = () => import('@/views/Layout/index.vue');
const NotFound = () => import('@/views/Error/404.vue');

const routes: RouteRecordRaw[] = [
  { path: '/404', name: 'notFound', component: NotFound },
  { path: '/:pathMatch(.*)', redirect: '/404' },
  { path: '/', name: 'layout', component: Layout }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});


router.afterEach(() => {
  NProgress.done();
});

export default router;
