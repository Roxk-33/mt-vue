import Vue from 'vue';
import Router from 'vue-router';
import Layout from 'src/views/layout';
import userLogin from 'src/views/page/user-login';
import userRegister from 'src/views/page/user-register';
import user from 'src/views/page/user';
import userInfo from 'src/views/page/user-info';
import userAddressList from 'src/views/page/user-address-list';
import userAddressInfo from 'src/views/page/user-address-info';
import shopList from 'src/views/page/shop-list';
import shopDetail from 'src/views/page/shop-detail';
import orderCreate from 'src/views/page/order-create';
import orderPay from 'src/views/page/order-pay';
import userOrderList from 'src/views/page/user-order-list';
import userCart from 'src/views/page/user-cart';
import userOrderDetail from 'src/views/page/user-order-detail';
import userOrderEvaluation from 'src/views/page/user-order-evaluation';
import addressMap from 'src/views/page/address-map';
import error from 'src/views/page/error';

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
        path: 'address/map',
        component: addressMap,
        name: 'addressMap',
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
        component: userCart,
        name: 'userCart',
      },
      {
        path: 'order/list',
        component: userOrderList,
        name: 'userOrderList',
      },
      {
        path: 'order/detail',
        component: userOrderDetail,
        name: 'userOrderDetail',
      },
      {
        path: 'order/evaluation',
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
        path: 'detail',
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
        path: 'pay',
        name: 'orderPay',
        component: orderPay,
      },
    ],
  },
  { path: '/', redirect: '/user/index' },
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
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRouterMap,
});
