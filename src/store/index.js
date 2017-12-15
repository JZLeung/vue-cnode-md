import Vue from 'vue'
import Vuex from 'vuex'

import * as TYPES from './mutationtypes'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        accessToken: '',
        loading: false,
        cache: {}
    },
    getters: {
        loading: state => state.loading,
        isLogin: state => !!state.accessToken,
        acToken: state => state.accessToken
    },
    mutations: {
        [TYPES.SET_LOADING](state, payload) {
            state.loading = payload
        },
        [TYPES.SET_ACCESS_TOKEN](state, payload) {
            state.accessToken = payload
        }
    },
    actions: {
        setLoading({commit}, loading) {
            commit(TYPES.SET_LOADING, loading)
        },
        setAcToken({commit}, acToken) {
            commit(TYPES.SET_ACCESS_TOKEN, acToken)
        }
    }
})
