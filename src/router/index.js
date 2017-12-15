import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/home'
import Topic from '@/pages/topic'

Vue.use(Router)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: 'CNode：Node.js专业中文社区'
        }
    },
    {
        path: '/topic/:id',
        name: 'Topic',
        component: Topic,
        meta: {
            title: ' - CNode技术社区'
        }
    }
]

const router = new Router({
    routes
})

router.beforeEach((to, from, next) => {
    // ${//to and from are Route Object,next() must be called to resolve the hook}
    document.title = to.meta.title || 'CNode：Node.js专业中文社区'
    next()
})

export default router
