<template>
  <div
    class="mt-loading"
    v-if="showMtLoading"
  >
    <img :src="imgSrc">
    <p>努力加载中...</p>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'MtLoading',
  props: {
    showMtLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      imgSrc: 'https://i.loli.net/2018/11/15/5bed5e23ea3f5.gif',
    };
  },
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
@import '~css/common';

.mt-loading {
  text-align: center;
  background-color: #fff;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: $zindex-fixed;
  img {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    margin: 0 auto;
  }
  p {
    color: $mt-gray;
    font-size: 15px;
    position: absolute;
    top: 52%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
