// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vant from 'vant';
import App from './App.vue';
import 'lib-flexible';
import 'vant/lib/vant-css/index.css';
import router from './common/router';
import store from './store/index';

import './assets/style/normalize.css';
import './directive';
import { Dialog } from 'vant';
import './assets/style/common.scss';
import './assets/style/rest.scss';

import MtLoadingMixin from '@/mixins/loading';

Vue.mixin(MtLoadingMixin);

Vue.use(Dialog);
// A modern alternative to CSS resets
Vue.config.productionTip = false;
Vue.use(Vant);
/* eslint-disable no-new */

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
