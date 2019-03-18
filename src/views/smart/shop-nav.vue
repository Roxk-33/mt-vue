<template>
  <div class="shop-nav mt-flex-space-between">
    <div class="nav-wrapper" :style="{ opacity: trackOpacity }" />
    <div @click="back">
      <i class="iconfont icon-xiangzuo" :class="{ blank: isMove }" />
    </div>
    <div class="shop-nav_right" :class="{ 'shop-nav_right_white': isTop }">
      <!-- <i class="iconfont icon-sousuo" />
      <i class="iconfont icon-shoucang" />
      <i class="iconfont icon-gengduo" /> -->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "ShopNav",
  props: {
    trackOpacity: {
      type: [Number, String],
      default: 0
    },
    isTop: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isMove: false
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  },
  watch: {
    trackOpacity(val) {
      this.isMove = val > 0;
    }
  }
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
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
  align-items: center;
  z-index: $zindex-navbar;
  .iconfont {
    font-size: 18px;
    color: #fff;
    font-size: 20px;
    margin: 5px;
    &.icon-sousuo {
      font-size: 20px;
    }
    &.blank {
      color: #000;
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
