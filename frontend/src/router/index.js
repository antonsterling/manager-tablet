import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import PersonalInfoView from '../views/PersonalInfoView.vue'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/personal-info',
        name: 'personal-info',
        component: PersonalInfoView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router