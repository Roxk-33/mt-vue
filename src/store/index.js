import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import shop from './modules/shop';
import cart from './modules/cart';
import order from './modules/order';
import globalPlugin from './plugin/global';

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    user,
    shop,
    cart,
    order,
  },
  strict: process.env.NODE_ENV !== 'production',
  plugins: [globalPlugin],
});

export default store;
