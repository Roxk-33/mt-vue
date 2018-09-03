<template>
  <div class="shop-header">
    <div class="box">
      <h3 class="title">骨汤麻辣烫</h3>
      <p class="fee">配送费约32分钟</p>
      <p class="announcement">公告：</p>
      <img class="pic" src="https://via.placeholder.com/150x150">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'shop-header',

  data() {
    return {};
  },
  components: {},
  methods: {},
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
@import '../../assets/style/common';

.shop-header {
  background: url('https://via.placeholder.com/350x150') no-repeat;
  background-clip: content-box;
  background-size: 100% 100%;
  height: 150px;
  position: relative;
  padding-bottom: 80px;
  background-color: #fff;
  .box {
    background-color: #fff;
    position: absolute;
    bottom: 10px;
    height: 80px;
    width: 80%;
    left: 0;
    right: 0;
    padding: 10px;
    margin: 10px auto;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    text-align: left;
    border-radius: 10px;

    p {
      margin: 5px 0;
    }
    .title {
      font-size: 18px;
      margin: 8px 0px;
    }
    .announcement {
      color: $mt-gray;
    }
    .pic {
      position: absolute;
      right: 9px;
      top: -25px;
      width: 50px;
      height: 50px;
      border-radius: 10px;
    }
  }
}
</style>
