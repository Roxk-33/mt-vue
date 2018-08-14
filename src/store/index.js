import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import globalPlugin from './plugin/global';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
  },
  // strict: siteConfig.ENV === 'development' ? true : false,
  plugins: [globalPlugin],
});

export default store;
