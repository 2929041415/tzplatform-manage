import axios from 'axios'
import qs from 'qs'
import {Message} from 'element-ui'
import * as cookieservice from '../service/cookieservice'
import router from '../router/index'

const warningoptions = {
  message: '网络异常,请稍后重试',
  type: 'warning'
}

/* 请求时的拦截 */
axios.interceptors.request.use(function (config) {

  const usertoken = cookieservice.getKey(cookieservice.USER_TOKEN)
  const useraccount = cookieservice.getKey(cookieservice.USER_ACCOUNT)
  if (usertoken) {
    config.headers['TZ-Token'] = usertoken
  }
  if (useraccount) {
    config.headers['TZ-Account'] = useraccount
  }
  return config

}, function (error) {

  Message(warningoptions)

  return Promise.reject(error)
})

/* 响应时拦截 */
axios.interceptors.response.use(function (response) {

  const res = response.data
  if (res.code === '-2') {
    cookieservice.removeKey(cookieservice.USER_TOKEN)
    cookieservice.removeKey(cookieservice.USER_ACCOUNT)
    cookieservice.removeKey(cookieservice.USER_MENU)
    //window.location.href='/'
    router.push({path: '/'})
  }

  return response

}, function (error) {

  Message(warningoptions)

  return Promise.reject(error)
})

/* 全局配置 */
/* 超时时间 */
axios.defaults.timeout = 15000
axios.defaults.baseURL = process.env.API_PORT
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

class request {
  static Get(url) {
    /* 通过Promise完成异步操作，将数据进行初步处理输出为Json对象 */
    return new Promise((resolve, reject) => {
      axios.get(url)
        .then((res) => {
          switch (res.status) {
            case 0:
              break
            default:
              resolve(res.data)
              break
          }
        }).catch((error) => {
        reject(error)
      })
    })
  }

  static Post(url, data) {
    /* 通过Promise完成异步操作，将数据进行初步处理输出为Json对象 */
    const cloneData = qs.stringify(data, {skipNulls: true})
    const P = new Promise((resolve, reject) => {
      axios.post(url, cloneData)
        .then((res) => {
          switch (res.status) {
            case 0:
              break
            default:
              resolve(res.data)
              break
          }
        }).catch((error) => {
        reject(error)
      })
    })
    return P
  }

  static PostFile(url, data) {
    /* 通过Promise完成异步操作，将数据进行初步处理输出为Json对象 */
    const P = new Promise((resolve, reject) => {
      axios.post(url, data, {timeout: 15000, baseURL: '/tzmanage/', headers: {'Content-Type': 'multipart/form-data'}})
        .then((res) => {
          switch (res.status) {
            case 0:
              break
            default:
              resolve(res.data)
              break
          }
        }).catch((error) => {
        reject(error)
      })
    })
    return P
  }
}

export default request
