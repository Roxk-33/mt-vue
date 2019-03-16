<template>
  <div class="header-nav" :style="style">
    <div class="header-nav-left">
      <i class="iconfont icon-xiangzuo" v-if="isBack" @click="clickLeftBtn" />
      <i class="iconfont icon-close" v-else @click="clickLeftBtn" />
    </div>
    <div class="header-nav-main">
      <span class="headerNav-title">{{ title }}</span>
    </div>
    <div class="header-nav-right">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: "HeaderNav",

  props: {
    headerbgColor: {
      type: String,
      default: "#fff"
    },
    title: {
      type: String,
      default: ""
    },
    isBack: {
      type: Boolean,
      default: true
    },
    leftClick: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: true
    },
    backRouter: {
      type: Object,
      default: null
    }
  },
  methods: {
    clickLeftBtn() {
      if (this.leftClick) {
        this.$emit("left-click-fn");
      } else {
        if (this.backRouter) {
          this.$router.push(this.backRouter);
        } else {
          this.$router.go(-1);
        }
      }
    }
  },
  computed: {
    style() {
      return {
        borderBottom: this.border ? "1px solid rgba(128, 128, 128, 0.26)" : "0",
        backgroundColor: this.headerbgColor
      };
    }
  }
};
</script>
<style scoped rel="stylesheet/scss" lang="scss">
.header-nav {
  width: 100%;
  height: 46px;
  line-height: 46px;
  background-color: #fff;
  position: relative;
  border-bottom: 1px solid #b1adad12;
  justify-content: space-between;
  display: flex;
  padding: 5px 10px;
  align-items: center;
  box-sizing: border-box;
  .header-nav-left {
    display: flex;
    align-items: center;
  }
  .header-nav-main {
    font-size: 16px;
    @include center;
  }
}
</style>
