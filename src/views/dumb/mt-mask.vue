<template>
  <transition name="van-fade">
    <div
      v-show="value"
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
  name: 'MtMask',

  props: {
    value: Boolean,
    zIndex: Number,
    className: String,
    customStyle: Object,
    closeOnClickOverlay: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    style() {
      return {
        ...this.customStyle,
      };
    },
  },
  methods: {
    onClick(ev) {
      this.$emit('click', ev);
      this.closeOnClickOverlay && this.$emit('input', false);
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import '~css/common';

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
