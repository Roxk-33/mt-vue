import Vue from 'vue';
import MtLoading from './mt-loading';
let modal = null;
export default {
  data() {
    return {
      mtLoading: false,
      targetNode: null,
    };
  },
  methods: {
    openMtLoading() {
      const vm = this;
      const el = vm.$el;
      this.targetNode =
        el && el.parentNode && el.parentNode.nodeType !== 11
          ? el.parentNode
          : document.body;
      modal = new (Vue.extend(MtLoading))({
        el: document.createElement('div'),
      });
      this.targetNode.appendChild(modal.$el);
      Object.assign(modal, {
        showMtLoading: true,
      });
    },
    closeMtLoading() {
      modal.showMtLoading = false;
      if (modal) {
        // this.targetNode.removeChild(modal.$el);
      }
    },
  },
  watch: {
    mtLoading(val) {
      if (val) this.openMtLoading();
      else this.closeMtLoading();
    },
  },
};
