import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/home'
import Topic from '@/pages/topic'
import UserLogin from '@/pages/user/login'

// import store from '@/store'

Vue.use(Router)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: 'CNode：Node.js专业中文社区',
            keepAlive: true
        }
    },
    {
        path: '/topic/:id',
        name: 'Topic',
        component: Topic,
        meta: {
            title: ' - CNode技术社区'
        }
    },
    {
        path: '/user/login',
        name: 'UserLogin',
        component: UserLogin,
        meta: {
            title: '登录 - CNode技术社区'
        }
    },
    {
        path: '/user/:loginname',
        name: 'UserInfo',
        component: require('@/pages/user').default,
        meta: {
            title: ' - CNode技术社区'
        }
    }
]

const router = new Router({
    mode: 'history',
    routes,
    scrollBehavior(to, from, pos) {
        console.log(to, from, pos)
        if (pos) {
            console.log(pos)
            return pos
        } else {
            // return {x: 0, y: 0}
            if (from.meta.keepAlive === true) {
                from.meta.savedPosition = document.body.scrollTop
            }
            return { x: 0, y: to.meta.savedPosition || 0 }
        }
    }
})

router.beforeEach((to, from, next) => {
    // ${//to and from are Route Object,next() must be called to resolve the hook}
    document.title = to.meta.title || 'CNode：Node.js专业中文社区'
    next()
})

export default router
