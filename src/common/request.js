import axios from 'axios';
import store from '@/store';
import { Toast } from 'vant';
// create an axios instance
const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'http://lococo.site:3000/api/v1/'
    : 'http://localhost:7001/api/v1/';
const service = axios.create({
  baseURL: baseURL, // api的base_url
  timeout: 50000, // request timeout
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
      if (data.code === 4001 || data.code === 4002 || data.code === 4001) {
        Toast('请登录！');
        store.dispatch('user/FedLogOut').then(() => {
          location.reload(); // 为了重新实例化vue-router对象 避免bug
        });
      } else if (data.code === 1003) {
        // store.dispatch('FedLogOut').then(() => {
        //     location.reload();// 为了重新实例化vue-router对象 避免bug
        //   });
      }
      Toast(data.message);
      return Promise.reject(data);
    }
    return Promise.resolve(data);
  },

  error => {
    console.log(`err${error}`); // for debug
    const resp = error.response;
    if (resp.data.message) {
      return Promise.reject(error.response.data.message);
    }
    return Promise.reject('系统出错');
  }
);

export default service;
