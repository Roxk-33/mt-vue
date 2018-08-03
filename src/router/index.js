import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/views/layout';
import Login from '@/views/login';
import user from '@/views/user';
import userInfo from '@/views/user-info';
import shopList from '@/views/shop-list';
import shopDetail from '@/views/shop-detail';

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
