<template>
  <div class='header-nav' :style="style">
    <div class='header-nav-left'>
      <i class='iconfont icon-xiangzuo' v-if='isBack' @click="clickLeft"></i>
      <i class='iconfont icon-guanbi1' v-if="isClose" @click="clickLeft"></i>
    </div>
    <div class='header-nav-main'>
      <span class='headerNav-title'>{{title}}</span>
    </div>
    <div class='header-nav-right'>
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'headerNav',

  props: {
    headerbgColor: {
      type: String,
      default: '#fff',
    },
    title: {
      type: String,
      default: '',
    },
    isClose: {
      type: Boolean,
      default: false,
    },
    isBack: {
      type: Boolean,
      default: true,
    },
    onLeft: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    clickLeft() {
      if (!!this.onLeft) {
        this.$emit('click-left');
      } else {
        this.$router.go(-1);
      }
    },
  },
  created() {},
  computed: {
    style() {
      return {
        borderBottom: this.border ? '1px solid rgba(128, 128, 128, 0.26)' : '0',
        backgroundColor: this.headerbgColor,
      };
    },
  },
};
</script>
<style scoped rel="stylesheet/scss" lang="scss">
@import '~css/common';

.header-nav {
  width: 100%;
  height: 46px;
  line-height: 46px;
  background-color: #fff;
  position: relative;
  border-bottom: 1px solid #b1adad12;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  box-sizing: border-box;
  .header-nav-main {
    font-size: 16px;
    @include center;
  }
}
</style>
