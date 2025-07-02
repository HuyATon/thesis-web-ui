import { createRouter, createWebHistory } from 'vue-router'
import AppHomePage from '../views/AppHomePage.vue'
import AppBenchmarkPage from '../views/AppBenchmarkPage.vue'


const routes = [
    { path : '/', component: AppHomePage },
    { path : '/benchmark', component: AppBenchmarkPage }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router