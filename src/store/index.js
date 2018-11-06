import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import address from './modules/address';
import shop from './modules/shop';
import globalPlugin from './plugin/global';

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    user,
    address,
    shop,
  },
  strict: process.env.NODE_ENV !== 'production',
  plugins: [globalPlugin],
});

export default store;
