import {
    createRouter,
    createWebHistory,
} from 'vue-router'

import homeIndex from '@/components/homeIndex.vue'
import sewerClassify from '@/components/sewerClassify.vue'

const routes = [
    {
        path: '/',
        component: homeIndex, 
    },
    {
        path: '/sewerClassify',
        component: sewerClassify,
    },
    
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;