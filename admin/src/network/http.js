import axios from 'axios'
import Vue from 'vue'
import router from '@/router'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/admin/api'
  // baseURL: 'http://localhost:3000/admin/api'
})

//请求头拦截设置授权
http.interceptors.request.use(config => {

  if (sessionStorage.token) {
    config.headers.Authorization = 'Bearer ' + sessionStorage.token
  }
  return config
}, err => {
  return Promise.reject(err)
})

//响应拦截
http.interceptors.response.use(res => {
  // console.dir(res.headers);

  return res
}, err => {
  // console.dir(err.response.data)
  if (err.response.data.message) {
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message,
    })
    if (err.response.status === 401) {
      router.push('/login')
    }
    if (err.response.status === 302) {
      router.push('/homepage')
    }
  }
  return Promise.reject(err)
})
export default http