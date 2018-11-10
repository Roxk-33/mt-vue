// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vant from 'vant';
import 'lib-flexible';
import 'vant/lib/vant-css/index.css';
import App from './App';
import router from './common/router';
import store from './store/index';

import './assets/style/normalize.css';
import './directive';
import './assets/style/common.scss';
import { Dialog } from 'vant';

Vue.use(Dialog);
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
