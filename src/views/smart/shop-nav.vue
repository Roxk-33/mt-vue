<template>
  <div class="shop-nav mt-flex-space-between">
    <div class="nav-wrapper" :style="{opacity:trackOpacity}"></div>
    <router-link to="/shop/list">
      <i class="iconfont icon-xiangzuo"></i>
    </router-link>
    <div class="shop-nav_right" :class="{'shop-nav_right_white' :isTop}">
      <i class="iconfont icon-sousuo"></i>
      <i class="iconfont icon-shoucang"></i>
      <i class="iconfont icon-gengduo"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'shop-nav',
  props: {
    trackOpacity: {
      type: [Number, String],
      default: 0,
    },
    isTop: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  components: {},
  methods: {},
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
@import '~css/common';

.shop-nav {
  padding: 0.1rem;
  box-sizing: border-box;
  width: 100%;
  height: 35px;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  transition: all 0.5s;
  z-index: $zindex-first;
  .iconfont {
    font-size: 18px;
    color: #fff;
    font-size: 20px;
    margin: 5px;
    &.icon-sousuo {
      font-size: 20px;
    }
  }

  .nav-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: inherit;
    background: white;
    opacity: 0;
    z-index: -1;
  }

  .shop-nav_right {
    color: white;

    i {
      transition: all 0.5s;
    }
    &.shop-nav_right_white i {
      color: $mt-color;
    }
  }
}
</style>
