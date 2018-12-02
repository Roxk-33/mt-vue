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
    // Do something before request is sent

    // 百度地图相关接口需要nginx代理接口
    const isProxy = config.url.indexOf('proxy') !== -1;
    if (store.getters['user/token'] && !isProxy) {
      config.headers.Authorization = `token ${store.getters['user/token']}`;
      config.headers['mt'] = store.getters.token; // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    }
    return config;
  },
  error => {
    console.log(error); // for debug
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
        store.dispatch('user/FedLogOut').then(() => {
          location.reload(); // 为了重新实例化vue-router对象 避免bug
          router.push('/user/login');
        });
      } else {
        return Promise.reject(data.message, data);
      }
    }
    return Promise.resolve(data);
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
