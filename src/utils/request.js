import axios from 'axios';

// 创建axios实例
const request = axios.create({
//   baseURL: 'http://127.0.0.1:7001', // API 请求的base URL
  baseURL: 'http://47.97.212.228:7001', // 服务区ip
  timeout: 10000, // 请求超时时间
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 在这里可以添加请求前的逻辑，比如设置token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 请求错误处理
    return Promise.reject(error);
  },
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 响应数据处理
    return response.data;
  },
  (error) => {
    // 响应错误处理
    return Promise.reject(error);
  },
);

export default request;
