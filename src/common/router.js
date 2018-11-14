import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/views/layout';
import userLogin from '@/views/page/user-login';
import userRegister from '@/views/page/user-register';
import user from '@/views/page/user';
import userInfo from '@/views/page/user-info';
import userAddressList from '@/views/page/user-address-list';
import userAddressInfo from '@/views/page/user-address-info';
import shopList from '@/views/page/shop-list';
import shopDetail from '@/views/page/shop-detail';
import orderCreate from '@/views/page/order-create';
import userOrderList from '@/views/page/user-order-list';
import userCart from '@/views/page/user-cart';
import userOrderDetail from '@/views/page/user-order-detail';
import userOrderEvaluation from '@/views/page/user-order-evaluation';

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
        component: userCart,
        name: 'userCart',
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
        path: 'evaluation',
        component: userOrderEvaluation,
        name: 'userOrderEvaluation',
      },
      {
        path: 'create',
        name: 'orderCreate',
        component: orderCreate,
      },
    ],
  },
  { path: '/', redirect: '/user/index' },
  // { path: '/404', component: _import('errorPage/404'),  },
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
  routes: constantRouterMap,
});
