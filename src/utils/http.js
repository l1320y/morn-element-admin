import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const http = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // request timeout
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
    const res = response.data
    if (!res.success) {
      Message({
        message: res.message,
        type: res.level,
        duration: 5 * 1000
      })
      return Promise.reject(res.message)
      // // 请自行引入 MessageBox
      // // import { Message, MessageBox } from 'element-ui'
      // MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
      //   confirmButtonText: '重新登录',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   store.dispatch('FedLogOut').then(() => {
      //     location.reload() // 为了重新实例化vue-router对象 避免bug
      //   })
      // })
    } else {
      return response.data
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
