<template>
  <transition name="van-fade">
    <div
      v-show="visible"
      class="mt-modal"
      :class="className"
      :style="style"
      @touchmove.prevent.stop
      @click="onClick($event)"
    />
  </transition>
</template>

<script type="text/ecmascript-6">
export default {
  name: "MtMask",

  props: {
    visible: Boolean,
    zIndex: Number,
    className: String,
    customStyle: Object,
    lockScroll: {
      type: Boolean,
      default: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    style() {
      return {
        ...this.customStyle
      };
    }
  },
  methods: {
    onClick(ev) {
      this.$emit("click", ev);
      this.closeOnClickOverlay && this.$emit("input", false);
    }
  },
  watch: {
    visible: {
      deep: true,
      handler(val) {
        if (val && this.lockScroll) {
          document.body.classList.add("mt-overflow-hidden");
        } else {
          document.body.classList.remove("mt-overflow-hidden");
        }
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.mt-modal {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: $zindex-mask;
}
</style>
