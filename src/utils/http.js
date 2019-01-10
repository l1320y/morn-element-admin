import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const http = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 0 // request timeout
})

// request interceptor
http.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (store.getters.token) {
      // 携带Token
      config.headers['Token'] = getToken()
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
http.interceptors.response.use(
  response => {
    const result = response.data
    if (!result.success) {
      Message({
        message: result.message,
        type: result.level,
        duration: 5 * 1000
      })
      return Promise.reject(result.message)
    } else {
      return result.data || {}
    }
  },
  error => {
    console.log(error) // for debug
    let message
    switch (error.response.status) {
      case 401:
        message = '401：尚未登录/登录超时'
        break
      case 504:
        message = '504：服务器未响应'
        break
      default:
        message = error.message
        break
    }
    Message({
      message: message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default http
