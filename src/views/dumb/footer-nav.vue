<template>

  <van-tabbar v-model="active" @change="toPage">
    <van-tabbar-item>
      <i class='iconfont icon-index' slot="icon" />
      商店
    </van-tabbar-item>
    <van-tabbar-item>
      <i class='iconfont icon-order-list' slot="icon" />
      订单
    </van-tabbar-item>
    <van-tabbar-item icon="records">
      <i class='iconfont icon-person' slot="icon" />
      我的
    </van-tabbar-item>
  </van-tabbar>

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
    return {
      active: 0,
    };
  },
  methods: {
    toPage(index) {
      let path = '';
      switch (index) {
        case 0:
          path = '/shop/list';
          break;
        case 1:
          path = '/user/order/list';
          break;
        case 2:
          path = '/user/index';
          break;
      }
      this.$router.push({ path });
    },
  },
  created() {
    if (this.routeName === 'userIndex') this.active = 2;
    if (this.routeName === 'userOrderList') this.active = 1;
  },
};
</script>
<style scoped rel="stylesheet/scss" lang="scss">
.van-tabbar {
  padding-top: 5px;
}
.van-tabbar-item {
  color: $mt-gray;
  i {
    font-size: 25px;
  }
}
.van-tabbar-item--active {
  color: $mt-color;
}
</style>
