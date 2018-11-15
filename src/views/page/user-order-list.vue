<template>
  <div class="user-order-list">
    <order-list-header></order-list-header>
    <van-list v-model="loading" :finished="finished" :immediate-check="false" @load="onPullingUp">
      <div class="order-list-content">
        <order-list-item v-for="item in orderList" :key="item.id" :orderInfo="item" :foodList="item.food_list"></order-list-item>
      </div>

      <van-cell v-if="orderList.length === 0" class="list-empty">
        <p>没有数据</p>
      </van-cell>
    </van-list>

    <footer-nav active='1'></footer-nav>
  </div>
</template>

<script type="text/ecmascript-6">
import orderListHeader from '@/views/smart/order-list-header';
import orderListItem from '@/views/smart/order-list-item';
import footerNav from '@/views/dumb/footer-nav';

export default {
  name: 'user-order-list',

  data() {
    return {
      orderList: [],
      loading: false,
      finished: false,
      page: 0,
    };
  },
  components: {
    orderListHeader,
    orderListItem,
    footerNav,
  },
  created() {
    this.getList();
  },
  methods: {
    onPullingUp() {
      this.loading = true;
      this.getList();
    },
    getList() {
      this.mtLoading = true;
      this.$store
        .dispatch('order/getOrderList', this.page)
        .then(resp => {
          this.mtLoading = false;

          this.loading = false;
          this.page++;
          this.orderList = resp.data;
        })
        .catch(err => {
          this.mtLoading = false;
          this.$toast(err);
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.order-list-content {
  margin-top: 85px;
}
</style>
