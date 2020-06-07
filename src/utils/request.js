import axios from 'axios'
import router from '../router'
import Toast from "muse-ui-toast";
import store from "../store";
import {getToken} from './auth'


const service = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 18000,
})

service.interceptors.request.use(config => {
    if (getToken()) {
        config.headers['Authorization'] = getToken()
    }
    return config
}, error => {
    Promise.reject(error)
})

service.interceptors.response.use(response => {
    const resp = response.data
    if (resp.code !== 200) {
        if (resp.code === 403) {
            store.dispatch('logout')
            Toast.error('无权限访问')
        }
        return resp
    } else if (resp.code === 200 || response.code === 200) {
        return resp
    }
}, error => {
    return Promise.reject(error)
})

export default service