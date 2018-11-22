<template>
  <div class="error">
    <p class="slogan">哎呀系统出错了</p>
    <router-link class="btn" to="/user/index">返回首页</router-link>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'mt-error-page',
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.slogan {
  font-size: 17px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
}
.btn {
  display: inline-block;
  width: 120px;
  height: 30px;
  font-size: 16px;
  line-height: 34px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 55%;
  background-color: $mt-color;
  color: #fff;
  text-align: center;
  border: 1px solid $mt-color;
}
</style>
