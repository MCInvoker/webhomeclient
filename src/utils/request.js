import axios from 'axios';
import CryptoJS from 'crypto-js';
import { message } from 'antd';

// 创建axios实例
const request = axios.create({
  // baseURL: 'http://127.0.0.1:7001', // API 请求的base URL
  // baseURL: 'http://47.97.212.228:7001', // 服务区ip
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
    const authorization = response.headers.get('authorization')
    if (authorization) {
        localStorage.setItem('token', authorization)
    }
    // 服务端已知错误处理
    if (response && response.data && response.data.success === false && response.data.message) {
        message.info(response.data.message)
    }
    // 响应数据处理
    return response.data;
  },
  (error) => {
    try {
      const response = error.response;
      if (response.status === 401) {
        // 对路径进行加解密主要不是为了安全问题，而是防止路径中出现多个问号?导致路径参数解析混乱
        const path = window.location.href;
        const encryptPath = CryptoJS.AES.encrypt(path, 'path').toString();
        let url = `${window.location.origin}/login?path=${encryptPath}`;
        localStorage.removeItem('token')
        window.location.href = url;
      }
      message.error(error.response.data.message)
    } catch (err) {
      console.log(err)
    }
    // 响应错误处理
    return Promise.reject(error);
  },
);

export default request;
