import axios from 'axios';
import type { AxiosError, AxiosRequestConfig, CreateAxiosDefaults } from 'axios';
import { BASE_URL } from '@/utils/config.ts';

export interface Result<T = any> {
  code: number;
  msg: string;
  data: T;
}

const service = axios.create(<CreateAxiosDefaults>{
  baseURL: BASE_URL,
  timeout: 30000
});

// 响应拦截器
service.interceptors.response.use(response => {
  let { code, msg } = response.data;
  // 根据自定义错误码判断请求是否成功
  if (code === 200) {
    // 将组件用的数据返回
    return response.data;
  }
  if (code === 401) {
    const { origin, pathname } = window.location;
    if (pathname !== '/') window.location.href = `${origin}/#/`;
  }
  
  // // 处理业务错误
  // window.$message.error(msg);
  // return Promise.reject(new Error(msg));
}, (error: AxiosError) => {
  // HTTP 状态码
  const status = error.response?.status;
  const codeMsg = {
    400: '参数错误',
    401: '认证失效',
    403: '拒绝访问',
    404: '资源不存在',
    500: '服务器故障'
  };
  window.$message.error(codeMsg[status as keyof typeof codeMsg] || '服务器故障');
  return Promise.reject(error);
});

export default {
  get<T = Result>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.get(url, config);
  },
  post<T = Result>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.post(url, data, config);
  },
  put<T = Result>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.put(url, data, config);
  },
  patch<T = Result>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.patch(url, data, config);
  },
  delete<T = Result>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.delete(url, config);
  }
};
