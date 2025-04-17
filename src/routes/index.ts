import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

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
    history: createWebHashHistory(),
    routes,
});

export default router;
