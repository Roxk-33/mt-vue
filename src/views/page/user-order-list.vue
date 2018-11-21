<template>
  <div class="user-order-list">
    <order-list-header />

    <van-pull-refresh
      v-model="pullingDownLoading"
      @refresh="onPullingDown"
    >

      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        @load="onPullingUp"
      >
        <div class="order-list-content">
          <order-list-item
            v-for="(item,index) in orderList"
            :key="index"
            :order-info="item"
            :food-list="item.food_list"
            @cancelOrder="cancelOrder"
          />
        </div>

        <van-cell
          v-if="orderList.length === 0"
          class="list-empty"
        >
          <p>没有数据</p>
        </van-cell>
      </van-list>

    </van-pull-refresh>

    <footer-nav active='1' />
  </div>
</template>

<script type="text/ecmascript-6">
import orderListHeader from '@/views/smart/order-list-header';
import orderListItem from '@/views/smart/order-list-item';
import footerNav from '@/views/dumb/footer-nav';

export default {
  name: 'UserOrderList',

  data() {
    return {
      orderList: [],
      loading: false,
      finished: false,
      pullingDownLoading: false,
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
      this.$store
        .dispatch('order/cancelOrder', id)
        .then((resp) => {
          this.page = 0;
          this.orderList = [];
          this.getList();
        })
        .catch((err) => {
          console.log(err);
          this.$toast(err);
        });
    },
    onPullingDown() {
      this.pullingDownLoading = true;
      this.orderList = [];
      this.getList();
    },
    onPullingUp() {
      this.loading = true;
      this.getList();
    },
    getList() {
      // 初次进入页面展示loadnig
      if (this.orderList.length === 0 && !this.pullingDownLoading) {
        this.mtLoading = true;
      }
      this.$store
        .dispatch('order/getOrderList', this.page)
        .then((resp) => {
          this.mtLoading = false;
          this.pullingDownLoading = false;
          this.loading = false;
          if (resp.data.length === 0) {
            this.finished = true;
          } else {
            this.page++;
            this.orderList = this.orderList.concat(resp.data);
          }
        })
        .catch((err) => {
          console.log(err);
          this.mtLoading = false;
          this.pullingDownLoading = false;
          this.finished = true;
          this.loading = false;
          this.$toast(err);
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
