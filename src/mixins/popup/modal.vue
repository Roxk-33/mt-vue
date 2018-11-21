<template>
  <transition name="van-fade">
    <div
      v-show="visible"
      class="mt-modal"
      :class="className"
      :style="style"
      @touchmove.prevent.stop
      @click="$emit('click', $event)"
    />
  </transition>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Modal',

  props: {
    visible: Boolean,
    className: String,
    customStyle: Object,
  },
  computed: {
    style() {
      return {
        ...this.customStyle,
      };
    },
  },
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">


.mt-modal {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: $zindex-mask;
  background-color: rgba(0, 0, 0, 0.7);
}
</style>
