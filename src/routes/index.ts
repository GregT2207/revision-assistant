import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/home.vue'),
    },
    {
        path: '/exams/:title/questions',
        name: 'questions',
        component: () => import('@/views/questions.vue'),
    },
    {
        path: '/exams/:title/marking',
        name: 'marking',
        component: () => import('@/views/marking.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.afterEach(async (to, from, failure) => {
    if (!failure) setTimeout(() => window.HSStaticMethods.autoInit(), 100);
});

export default router;
