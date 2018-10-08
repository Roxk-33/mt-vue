import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/views/layout';
import Login from '@/views/page/login';
import user from '@/views/page/user';
import userInfo from '@/views/page/user-info';
import userAddressList from '@/views/page/user-address-list';
import userAddressInfo from '@/views/page/user-address-info';
import shopList from '@/views/page/shop-list';
import shopDetail from '@/views/page/shop-detail';
import orderPay from '@/views/page/order-pay';
import userOrderList from '@/views/page/user-order-list';
import userOrderDetail from '@/views/page/user-order-detail';

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
        path: 'list',
        component: userOrderList,
        name: 'userOrderList',
      },
      {
        path: 'detail',
        component: userOrderDetail,
        name: 'userOrderDetail',
      },
      {
        path: 'pay',
        name: 'pay',
        component: orderPay,
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
