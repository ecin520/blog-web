import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken, clearToken } from '../utils/auth'
import { getUserInfo, setUserInfo, clearUserInfo } from '../utils/user'


Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: getToken(),
        userInfo: getUserInfo(),

    },
    getters: {
        getToken: state => state.token,
        getUserInfo: state => state.userInfo
    },
    mutations: {
        setToken(state, token) {
            state.token = token
            setToken(token)
        },
        clearToken(state) {
            state.token = null
            clearToken()
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo
            setUserInfo(userInfo)
        },
        clearUserInfo(state) {
            state.userInfo = null
            clearUserInfo()
        }
    },
    actions: {
        login(ctx, { token, userInfo }) {
            console.log(token)
            ctx.commit('setToken', token)
            ctx.commit('setUserInfo', userInfo)
        },
        logout(ctx) {
            ctx.commit('clearToken')
            ctx.commit('clearUserInfo')
        }
    },
})

export default store