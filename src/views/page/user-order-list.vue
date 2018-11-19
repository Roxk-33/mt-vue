<template>
  <div class="user-order-list">
    <order-list-header></order-list-header>
    <van-list v-model="loading" :finished="finished" :immediate-check="false" @load="onPullingUp">
      <div class="order-list-content">
        <order-list-item v-for="(item,index) in orderList" :key="index" :orderInfo="item" :foodList="item.food_list" @cancelOrder="cancelOrder"></order-list-item>
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
    cancelOrder(id) {
      console.log(123);

      this.$store
        .dispatch('order/cancelOrder', id)
        .then(resp => {
          this.page = 0;
          this.orderList = [];
          this.getList();
        })
        .catch(err => {
          console.log(err);
          this.$toast(err);
        });
    },
    onPullingUp() {
      this.loading = true;
      this.getList();
    },
    getList() {
      // 初次进入页面展示loadnig
      if (this.orderList.length === 0) {
        this.mtLoading = true;
      }
      this.$store
        .dispatch('order/getOrderList', this.page)
        .then(resp => {
          this.mtLoading = false;
          if (resp.data.length === 0) {
            this.finished = true;
          } else {
            this.loading = false;
            this.page++;
            this.orderList = this.orderList.concat(resp.data);
          }
        })
        .catch(err => {
          console.log(err);
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
