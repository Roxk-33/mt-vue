import axios from 'axios';
import store from 'src/store';
import { Toast } from 'vant';
import CONFIG from './config';

const baseURL = process.env.VUE_APP_ENV === 'production'
  ? CONFIG.BASE_URL.PRO
  : CONFIG.BASE_URL.DEV;
const service = axios.create({
  baseURL,
  timeout: 50000,
});

// request interceptor
/* eslint-disable */
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (store.getters['user/token']) {
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
    const data = response.data;
    if (!data.status) {
      console.log('出错！');
      if (data.code === 4001 || data.code === 4002) {
        Toast('请登录！');
        store.dispatch('user/FedLogOut').then(() => {
          location.reload(); // 为了重新实例化vue-router对象 避免bug
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
