<template>
  <div class="user-order-list">
    <order-list-header />
    <mt-better-scroll
      ref="contentScroll"
      :data="orderList"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp"
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

    </mt-better-scroll>

    <list-empty :isShow="finished" />
    <footer-nav active='1' />
  </div>
</template>

<script type="text/ecmascript-6">
import orderListHeader from "@/views/smart/order-list-header";
import orderListItem from "@/views/smart/order-list-item";
import footerNav from "@/views/dumb/footer-nav";
import MtBetterScroll from "@/views/dumb/mt-better-scroll";
import listEmpty from "@/views/dumb/list-empty";
export default {
  name: "UserOrderList",

  data() {
    return {
      options: {
        pullDownRefresh: {
          threshold: 60,
          stop: 40,
          txt: "更新成功"
        }
      },
      orderList: [],
      loading: false,
      finished: false,
      pullUpLoad: true,
      pullingDownLoading: false,
      page: 0,

      secondStop: 26
    };
  },
  components: {
    orderListHeader,
    orderListItem,
    footerNav,
    MtBetterScroll,
    listEmpty
  },
  mounted() {
    this.getList();
  },
  methods: {
    onPullingUp() {
      this.loading = true;
      this.getList();
    },
    cancelOrder(id) {
      this.$store
        .dispatch("order/cancelOrder", id)
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
    onPullingDown() {
      this.page = 0;
      this.getList();
    },
    getList() {
      // 初次进入页面展示loadnig
      if (this.orderList.length === 0 && this.page === 0) {
        this.mtLoading = true;
      }
      this.$store
        .dispatch("order/getOrderList", this.page)
        .then(resp => {
          this.mtLoading = false;

          if (resp.data.length === 0 && this.page === 0) {
            this.finished = true;
            this.orderList = [];
            return;
          }
          if (this.page === 0) {
            this.orderList = resp.data;
          } else {
            this.orderList = this.orderList.concat(resp.data);
          }
          this.page++;
        })
        .catch(err => {
          console.log(err);
          this.mtLoading = false;
          this.pullingDownLoading = false;
          this.finished = true;
          this.loading = false;
          this.$toast(err);
        });
    }
  }
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.user-order-list {
  height: 100%;
}
// .order-list-content,
.better-scroll-wrapper {
  margin-top: 85px;
}
</style>
