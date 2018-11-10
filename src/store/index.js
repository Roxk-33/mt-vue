import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import address from './modules/address';
import shop from './modules/shop';
import cart from './modules/cart';
import globalPlugin from './plugin/global';

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    user,
    address,
    shop,
    cart,
  },
  strict: process.env.NODE_ENV !== 'production',
  plugins: [globalPlugin],
});

export default store;
