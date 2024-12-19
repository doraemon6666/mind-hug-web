import axios from 'axios';
import { Button, Space, Toast } from 'antd-mobile'
const baseURL = 'http://localhost:5000/api'  // API address
// 创建 axios 实例
const api = axios.create({
  baseURL: baseURL,
  timeout: 5000,  
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器：添加 token 或其他请求头
api.interceptors.request.use(
  (config) => {
    // 假设从 localStorage 获取 token，添加到请求头
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // 你还可以在这里做一些额外的操作，比如修改请求数据
    return config;  // 必须返回 config，否则请求不会继续
  },
  (error) => {
    // 请求错误的处理（如网络错误）
    return Promise.reject(error);
  }
);
const successCode = [200,201]

// 响应拦截器：处理响应数据
api.interceptors.response.use(
   
  (response) => {
    debugger
    let code = response.data.code;
    console.log(code,'this is response code---------')
    // 处理响应数据
    if (response.data &&  successCode.includes(code)) {
      // 可以在这里统一处理错误，比如返回非 200 状态码的错误信息
      return Promise.reject(new Error(response.data.message || 'API error'));
    }
    return response.data;  // 返回响应的 data 部分，方便后续调用直接获取数据
  },
  (error) => {
    // 处理响应错误
    if (error.response) {
      // 服务器返回错误响应
      if (error.response.status === 401) {
        // 例如：401 表示未授权，跳转到登录页
        Toast.show({
            content: 'Unauthorized access, please login.',
        })
        console.log('Unauthorized access, please login.');
      }
      if (error.response.status === 404) {
        Toast.show({
            icon: 'fail',
            content: error.response?.data.message,
        })
        console.log('Unauthorized access, please login.');
      }  else if (error.response.status === 500) {
        Toast.show({
            icon: 'fail',
            content: error.response?.data.message,
        })
        console.log('Server error, please try again later.');
      }
    } else {
      // 请求错误，网络问题等
      console.error('Request failed:', error.message);
    }
    return Promise.reject(error);  // 返回错误以便后续处理
  }
);

// 统一封装 GET、POST 请求方法
export const request = async (method, url, data = null) => {
  try {
    const response = await api({
      method,
      url,
      data,
    });
    return response;  // 返回响应数据
  } catch (error) {
    // throw error;  // 错误会被拦截器捕获
  }
};

export const get = async (url, params) => request('get', url, { params });
export const post = async (url, data) => request('post', url, data);
export const put = async (url, data) => request('put', url, data);
export const del = async (url, data) => request('delete', url, data);
