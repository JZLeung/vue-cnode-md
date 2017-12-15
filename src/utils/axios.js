import axios from 'axios'
// import {
//     getToken
// } from '@/utils/auth'
// import formdata from './form'
import store from '../store'

// 创建axios实例
const service = axios.create({
    // baseURL: process.env.BASE_API, // api的base_url
    baseURL: 'https://cnodejs.org/api/v1/',
    timeout: 15000 // 请求超时时间
})
// const errorShowTime = 2

// request拦截器
service.interceptors.request.use(config => {
    if (store.getters.acToken) {
        // config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded; chatset=UTF-8'
    // console.log(config)
    // config.data = formdata.obj2form(config.data)
    return config
}, error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
    response => {
        /**
         * code为非20000是抛错 可结合自己业务进行修改
         */
        const res = response.data
        if (res.success !== true) {
            return Promise.reject(res)
        } else {
            return res
        }
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)

export default service
