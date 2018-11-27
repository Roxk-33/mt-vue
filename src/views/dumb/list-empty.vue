<template>
  <div
    v-if="isShow"
    class="list-empty"
  >
    <p>没有数据</p>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "list-empty",

  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.list-empty {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  p {
    @include center;
    margin-top: -46px;
  }
}
</style>
