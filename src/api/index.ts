// 导入axios
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
// 配置请求的基准URL地址
axios.defaults.baseURL = 'http://www.fullstackjavascript.cn:3000'
// axios设置请求拦截器,设置响应头token
axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config
  },
  err => {
    console.log(err)
  }
)

// axios设置响应拦截器
axios.interceptors.response.use((response: AxiosResponse) => {
  if (response.data.err === 1) {
    return Promise.reject(response.data.data)
  }
  return response.data.data // 拦截处理响应结果，直接返回需要的数据
}, err => {
  Promise.reject(err)
})

export default axios
