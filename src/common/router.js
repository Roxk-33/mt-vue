import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/views/layout';
import userLogin from '@/views/page/user-login';
import user from '@/views/page/user';
import shopList from '@/views/page/shop-list';
import userOrderList from '@/views/page/user-order-list';
import shopDetail from '@/views/page/shop-detail';

const userOrderEvaluation = () =>
  import(/* webpackChunkName: "lazy-router" */ '@/views/page/user-order-evaluation');
const userAddressInfo = () =>
  import(/* webpackChunkName: "lazy-router" */ '@/views/page/user-address-info');
const userAddressList = () =>
  import(/* webpackChunkName: "lazy-router" */ '@/views/page/user-address-list');
const userOrderDetail = () =>
  import(/* webpackChunkName: "lazy-router" */ '@/views/page/user-order-detail');
const userCartList = () =>
  import(/* webpackChunkName: "lazy-router" */ '@/views/page/user-cart-list');
const userRegister = () =>
  import(/* webpackChunkName: "lazy-router" */ '@/views/page/user-register');
const userEvaluationList = () =>
  import(/* webpackChunkName: "lazy-router" */ '@/views/page/user-evaluation-list');
const orderPay = () => import(/* webpackChunkName: "lazy-router" */ '@/views/page/order-pay');
const orderCreate = () => import(/* webpackChunkName: "lazy-router" */ '@/views/page/order-create');
const userInfo = () => import(/* webpackChunkName: "lazy-router" */ '@/views/page/user-info');
const error = () => import(/* webpackChunkName: "lazy-router" */ '@/views/page/error');
Vue.use(Router);

export const constantRouterMap = [
  {
    path: '/user',
    name: 'user',
    component: Layout,
    children: [
      {
        path: 'index',
        component: user,
        name: 'userIndex',
      },
      {
        path: 'info',
        component: userInfo,
        name: 'userInfo',
      },

      {
        path: 'address/list',
        component: userAddressList,
        name: 'userAddressList',
      },
      {
        path: 'address/info',
        component: userAddressInfo,
        name: 'userAddressInfo',
      },
      {
        path: 'register',
        component: userRegister,
        name: 'userRegister',
      },
      {
        path: 'login',
        component: userLogin,
        name: 'userLogin',
      },
      {
        path: 'cart',
        component: userCartList,
        name: 'userCartList',
      },
      {
        path: 'order/list',
        component: userOrderList,
        name: 'userOrderList',
      },
      {
        path: 'evaluation/list',
        component: userEvaluationList,
        name: 'userEvaluationList',
      },
      {
        path: 'order/detail/:id',
        component: userOrderDetail,
        name: 'userOrderDetail',
      },
      {
        path: 'order/evaluation/:orderId',
        component: userOrderEvaluation,
        name: 'userOrderEvaluation',
      },
    ],
  },

  {
    path: '/shop',
    name: 'shop',
    component: Layout,
    children: [
      {
        path: 'list',
        component: shopList,
        name: 'shopList',
      },
      {
        path: 'list/:id',
        component: shopDetail,
        name: 'shopDetail',
      },
    ],
  },

  {
    path: '/order',
    name: 'order',
    component: Layout,
    children: [
      {
        path: 'create',
        name: 'orderCreate',
        component: orderCreate,
      },
      {
        path: 'pay/:orderId',
        name: 'orderPay',
        component: orderPay,
      },
    ],
  },
  { path: '/', component: user },
  { path: '/error', component: error },
  // { path: '/401', component: _import('errorPage/401'),  },
  // {
  //     path: '',
  //     component: Layout,
  //     redirect: 'dashboard',
  //     children: [{
  //         path: 'dashboard',
  //         component: _import('dashboard/index'),
  //         name: 'dashboard',
  //         meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
  //     }]
  // },
];
export default new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: constantRouterMap,
});
