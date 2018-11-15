<template>
  <div class='footerNav'>
    <div class="grid-content bg-purple" @click="toPage('/shop/list')">
      <i class='iconfont icon-index' :class='{"active" : routeName === "home" }'></i>
    </div>
    <div class="grid-content bg-purple" @click="toPage('/user/order/list')">
      <i class='iconfont icon-order-list' :class='{"active" : routeName === "userOrderList" }'></i>
    </div>
    <div class="grid-content bg-purple" @click="toPage('/user/index')">
      <i class='iconfont icon-person' :class='{"active" : routeName === "userIndex" }'></i>
    </div>
  </div>

</template>
<script>
export default {
  name: 'footer-nav',
  computed: {
    routeName() {
      return this.$route.name;
    },
  },
  props: {},
  data() {
    return {};
  },
  methods: {
    toPage(target) {
      this.$router.push({ path: target });
    },
  },
};
</script>
<style scoped rel="stylesheet/scss" lang="scss">
.footerNav {
  width: 100%;
  height: 1.5rem;
  line-height: 1.9rem;
  position: fixed;
  bottom: 0;
  background-color: whitesmoke;
  border-bottom: 1px solid rgba(128, 128, 128, 0.51);
  display: flex;
  justify-content: space-around;
  align-items: center;
  i {
    color: #bfbfbf;
    font-size: 30px;
    &.active {
      color: #ffd161;
    }
  }
}
</style>
