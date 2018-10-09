<template>
  <div class="order-list-header">
    <div class="header-top">
      <p>订单</p>
    </div>
    <ul class="header-nav">
      <li class="header-nav-item">全部订单</li>
      <li class="header-nav-item">待评价</li>
      <li class="header-nav-item">退款</li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'order-list-header',

  data() {
    return {};
  },
  components: {},
  methods: {},
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.order-list-header {
  background-color: #fff;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  border-bottom: 1px solid #cccccc;
  .header-top p {
    text-align: center;
    font-size: 18px;
    margin: 10px 0;
  }
  .header-nav {
    display: flex;
    justify-content: space-around;
    .header-nav-item {
      width: 100px;
      padding: 10px 0;
      font-size: 15px;
    }
  }
}
</style>
