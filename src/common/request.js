import axios from 'axios';
import store from '@/store';
import CONFIG from './config';
import router from './router';
const isPro = process.env.VUE_APP_ENV === 'production';
const baseURL = isPro ? CONFIG.BASE_URL.PRO : CONFIG.BASE_URL.DEV;
const service = axios.create({
  baseURL,
  timeout: 50000,
});

// request interceptor
/* eslint-disable */
service.interceptors.request.use(
  config => {
    // 百度地图相关接口需要nginx代理接口
    const isProxy = config.url.indexOf('proxy') !== -1;
    if (store.getters['user/token'] && !isProxy) {
      config.headers.Authorization = `token ${store.getters['user/token']}`;
    }
    return config;
  },
  error => {
    console.error(error); // for debug
    Promise.reject(error);
  }
);
// respone interceptor
service.interceptors.response.use(
  response => {
    const isProxy = response.config.url.indexOf('proxy') !== -1;
    const data = response.data;
    if (isProxy) return Promise.resolve(data);
    if (!data.status) {
      console.log('出错！');
      if (data.status_code === 4001 || data.status_code === 4002 || data.status_code === 401) {
        console.log('没登录');
        setTimeout(() => {
          store.dispatch('user/FedLogOut').then(() => {
            router.push('/user/login');
          });
        }, 10);
        return Promise.reject(data.message);
      }
      return Promise.reject(data);
    } else {
      return Promise.resolve(data);
    }
  },

  error => {
    console.log(`err${error}`); // for debug
    const resp = error.response;
    if (resp && resp.data && resp.data.message) {
      return Promise.reject(error.response.data.message);
    }
    return Promise.reject('系统错误');
  }
);

export default service;
