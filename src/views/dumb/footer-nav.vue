<template>
  <div class='footerNav'>
    <div
      class="grid-content bg-purple"
      @click="toPage('/shop/list')"
      :class='{"active" : routeName === "home" }'
    >
      <i class='iconfont icon-index' />
      <p>
        商店
      </p>
    </div>
    <div
      class="grid-content bg-purple"
      @click="toPage('/user/order/list')"
      :class='{"active" : routeName === "userOrderList" }'
    >
      <i class='iconfont icon-order-list' />
      <p>
        订单
      </p>
    </div>
    <div
      class="grid-content bg-purple"
      @click="toPage('/user/index')"
      :class='{"active" : routeName === "userIndex" }'
    >
      <i class='iconfont icon-person' />
      <p>
        我的
      </p>

    </div>
  </div>

</template>
<script>
export default {
  name: 'FooterNav',
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
@import '~css/common';

.footerNav {
  width: 100%;
  height: 1.5rem;
  position: fixed;
  bottom: 0;
  background-color: #fff;
  border-bottom: 1px solid rgba(128, 128, 128, 0.51);
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #bfbfbf;
  text-align: center;
  p {
    margin-top: 3px;
  }
  .grid-content.active {
    color: $mt-color;
  }
  i {
    font-size: 25px;
  }
}
</style>
