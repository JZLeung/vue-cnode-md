import Vue from 'vue'
import Vuex from 'vuex'

import * as TYPES from './mutationtypes'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        accessToken: '',
        loading: false,
        user: {},
        cache: {}
    },
    getters: {
        user: state => state.user,
        loading: state => state.loading,
        isLogin: state => !!state.accessToken,
        acToken: state => state.accessToken
    },
    mutations: {
        [TYPES.SET_USER_INFO](state, user) {
            state.user = user
        },
        [TYPES.SET_LOADING](state, payload) {
            state.loading = payload
        },
        [TYPES.SET_ACCESS_TOKEN](state, payload) {
            state.accessToken = payload
        },
        [TYPES.LOGOUT](state) {
            state.user = {
                loginname: '',
                avatar_url: ''
            }
            state.accessToken = ''
        }
    },
    actions: {
        setUserInfo({commit}, user) {
            commit(TYPES.SET_USER_INFO, user)
        },
        setLoading({commit}, loading) {
            commit(TYPES.SET_LOADING, loading)
        },
        setAcToken({commit}, acToken) {
            commit(TYPES.SET_ACCESS_TOKEN, acToken)
        },
        logout({commit}) {
            commit(TYPES.LOGOUT)
        }
    }
})
