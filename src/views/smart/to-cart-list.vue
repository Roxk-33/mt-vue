<template>
  <router-link class="to-cart-list" to="/user/cart">
    <i class="iconfont icon-gouwuche" />
  </router-link>
</template>

<script type="text/ecmascript-6">
export default {
  name: "ToCartList",

  data() {
    return {};
  },
  components: {},
  methods: {}
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.to-cart-list {
  position: fixed;
  bottom: 30px;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #fff;
  text-align: center;
  line-height: 30px;
  width: 1.3rem;
  height: 1.3rem;
  z-index: 100;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.4);
  .icon-gouwuche {
    font-size: 0.7rem;
  }
}
</style>
