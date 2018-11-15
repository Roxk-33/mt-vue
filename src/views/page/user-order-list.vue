<template>
  <div class="order-list">
    <order-list-header></order-list-header>
    <div class="order-list-content">
      <order-list-item v-for="item in orderList" :key="item.id" :orderInfo="item" :foodList="item.food_list"></order-list-item>
    </div>
    <footer-nav active='1'></footer-nav>
  </div>
</template>

<script type="text/ecmascript-6">
import orderListHeader from '@/views/smart/order-list-header';
import orderListItem from '@/views/smart/order-list-item';
import footerNav from '@/views/dumb/footer-nav';

export default {
  name: 'order-list',

  data() {
    return {
      orderList: [],
    };
  },
  components: {
    orderListHeader,
    orderListItem,
    footerNav,
  },
  created() {
    this.$store.dispatch('order/getOrderList', 0).then(resp => {
      this.orderList = resp.data;
    });
  },
  methods: {},
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.order-list-content {
  margin-top: 85px;
}
</style>
