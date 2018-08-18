import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/views/layout';
import Login from '@/views/login';
import user from '@/views/user';
import userInfo from '@/views/user-info';
import userAddressList from '@/views/user-address-list';
import userAddressInfo from '@/views/user-address-info';
import shopList from '@/views/shop-list';
import shopDetail from '@/views/shop-detail';
import orderPay from '@/views/order-pay';

Vue.use(Router);

export const constantRouterMap = [
  { path: '/login', component: Login },
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
    ],
  },
  {
    path: '/user/address/list/',
    component: userAddressList,
    name: 'userAddressList',
  },
  {
    path: '/user/address/info/',
    component: userAddressInfo,
    name: 'userAddressInfo',
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
        path: 'pay',
        component: orderPay,
        name: 'orderPay',
      },
    ],
  },
  { path: '/', component: shopList, hidden: true },
  // { path: '/404', component: _import('errorPage/404'), hidden: true },
  // { path: '/401', component: _import('errorPage/401'), hidden: true },
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
  routes: constantRouterMap,
});
