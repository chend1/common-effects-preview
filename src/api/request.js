import axios from 'axios'

const apiUrl =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:3001/api'
    : import.meta.env.VITE_BASE_URL

const request = axios.create({
  baseURL: apiUrl,
  timeout: 60000,
})

// 请求前拦截
const requestInterceptor = (config) => {
  // if (getStorage('token')) {
  //   config.headers['s-token'] = getStorage('token')
  // }
  console.log('发起请求');
  
  const { data, params, method, url } = config
  return config
}

// 响应拦截
const responseInterceptor = (response) => {
  const { data, code, error: msg } = response.data
  return data
}

request.interceptors.request.use(requestInterceptor, (error) => {
  return Promise.reject(error)
})
request.interceptors.response.use(responseInterceptor, (error) => {
  return Promise.reject(error)
})

export default request
