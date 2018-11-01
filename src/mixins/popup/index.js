import manager from './manager';
import context from './context';
export default {
  props: {
    value: Boolean,
    overlayClass: String,
    // whether to show overlay
    overlay: Boolean,
    closeOnClickOverlay: {
      type: Boolean,
      default: true,
    },
    // prevent body scroll
    lockScroll: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      inited: this.value,
    };
  },
  methods: {
    open() {
      manager.open(this, {
        className: this.overlayClass,
      });

      if (this.lockScroll) {
        // on(document, 'touchstart', this.touchStart);
        // on(document, 'touchmove', this.onTouchMove);
        if (!context.lockCount) {
          document.body.classList.add('mt-overflow-hidden');
        }
        context.lockCount++;
      }
    },
    close() {
      console.log(1);
      manager.close(this._popupId);
      this.$emit('input', false);
    },
  },
  mounted() {
    if (this.value) {
      this.open();
    }
  },
  created() {
    this._popupId = 'popup-' + context.plusKey('id');
  },
  watch: {
    value(val) {
      this.inited = this.inited || this.value;
      this[val ? 'open' : 'close']();
    },
  },
  activated() {
    /* istanbul ignore next */
    if (this.value) {
      this.open();
    }
  },

  beforeDestroy() {
    this.close();
  },

  deactivated() {
    /* istanbul ignore next */
    this.close();
  },
};
