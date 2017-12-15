// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import store from '@/store'

import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'

import Filters from '@/utils/filters'
Vue.use(MuseUI)
Vue.config.productionTip = false

console.log(Filters)

for (let filterName in Filters) {
    if (Filters.hasOwnProperty(filterName)) {
        const filter = Filters[filterName]
        Vue.filter(filterName, filter)
    }
}

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
