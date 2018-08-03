// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vant from 'vant';
import 'font-awesome/css/font-awesome.css';
import 'lib-flexible';
import 'vant/lib/vant-css/index.css';
import App from './App';
import router from './router';
import store from './store';

import './assets/style/normalize.css';
import './mock';
import './directive';
import './assets/style/common.css';
import './assets/style/icons.css';

// A modern alternative to CSS resets
Vue.config.productionTip = false;
Vue.use(Vant);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
