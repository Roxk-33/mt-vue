<template>
  <div class='headerNav'>
    <i class='el-icon-arrow-left back-icon left-icon' v-if='isBack' @click="back"></i>
    <i class='el-icon-close close-icon left-icon' v-if="isClose" @click="back"></i>
    <span class='headerNav-title'>{{title}}</span>
  </div>
</template>
<script>
export default {
  name: 'headerNav',
  props: {
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
  },
  methods: {
    back() {
      this.$router.back(-1);
    },
  },
};
</script>
<style scoped>
.headerNav {
  width: 100%;
  background-color: whitesmoke;
  position: relative;
  border-bottom: 1px solid rgba(128, 128, 128, 0.26);
}
.left-icon {
  position: absolute;
  left: 0.5rem;
  font-size: 1.5rem;
  font-weight: bolder;
  line-height: 3.5rem;
}
.headerNav-title {
  line-height: 3.5rem;
  font-size: 1.5rem;
  letter-spacing: 0.2rem;
}
</style>
