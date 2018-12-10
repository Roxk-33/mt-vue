<template>
  <div class="order-list-header">
    <div class="header-top">
      <p>订单</p>
    </div>
    <ul class="header-nav">
      <li
        class="header-nav-item"
        :class="{'active':active === 'all'}"
        @click="onClick('all')"
      >全部订单</li>
      <li
        class="header-nav-item"
        :class="{'active':active === 'eval'}"
        @click="onClick('eval')"
      >待评价</li>
      <li
        class="header-nav-item"
        :class="{'active':active === 'refund'}"
        @click="onClick('refund')"
      >退款</li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "OrderListHeader",

  data() {
    return {
      active: "all"
    };
  },
  components: {},
  methods: {
    onClick(type) {
      this.active = type;
      this.$emit("changeTab", type);
    }
  }
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
  z-index: $zindex-header;
  .header-top p {
    text-align: center;
    font-size: 18px;
    margin: 10px 0;
  }
  .header-nav {
    display: flex;
    justify-content: space-around;
    .header-nav-item {
      text-align: center;
      width: 100px;
      padding: 10px 0;
      font-size: 15px;
      position: relative;
      &.active::after {
        position: absolute;
        content: "";
        width: 20px;
        height: 2px;
        background-color: $mt-color;
        bottom: 5px;
        left: 50%;
        margin-left: -10px;
      }
    }
  }
}
</style>
