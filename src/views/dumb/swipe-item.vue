<template>
  <div :style="style" class='swipe-item'>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'swipe-item',
  data() {
    return {
      offset: 0,
    };
  },
  computed: {
    style() {
      const { vertical, width, height } = this.$parent;
      console.log(this.$parent);
      return {
        width: `${120}px`,
        marginRight: `${10}px`,
        // height: vertical ? height + 'px' : '100%',
        // transform: `translate${vertical ? 'Y' : 'X'}(${this.offset}px)`
      };
    },
  },
  beforeCreate() {
    this.$parent.swipes.push(this);
  },
  destroyed() {
    this.$parent.swipes.splice(this.$parent.swipes.indexOf(this), 1);
  },
};
</script>
<style>
.swipe-item {
  float: left;
  height: 100%;
}
</style>
