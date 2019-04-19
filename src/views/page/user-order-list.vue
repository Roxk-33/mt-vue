<template>
  <div class="user-order-list">
    <order-list-header @changeTab="changeTab" />
    <mt-better-scroll
      ref="contentScroll"
      :data="orderList"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp"
    >
      <div class="order-list-content">
        <order-list-item
          v-for="(item, index) in orderList"
          :key="index"
          :order-info="item"
          :food-list="item.food_list"
          @cancelOrder="cancelOrder"
        />
      </div>
    </mt-better-scroll>

    <list-empty :isShow="finished" />
    <footer-nav active="1" />
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
      searchType: "all",
      isInit: true,
      orderList: [],
      loading: false,
      finished: false,
      pullUpLoad: true,
      pullingDownLoading: false,
      page: 0,
      isEmpty: false,
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
        .dispatch("order/cancelOrder", {orderId :id, isTimeOut:0})
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
    changeTab(type) {
      this.page = 0;
      this.orderList = [];
      this.getList(type);
    },

    getList(type = "") {
      // 初次进入页面展示loadnig
      if (this.isInit) {
        this.mtLoading = true;
        this.isInit = false;
      }
      type && (this.searchType = type);
      this.$store
        .dispatch("order/getOrderList", {
          page: this.page,
          type: this.searchType
        })
        .then(resp => {
          this.mtLoading = false;
          if (resp.data.length === 0) {
            this.isEmpty = true;
            this.page === 0 && ((this.orderList = []), (this.finished = true));
            return;
          }
          this.finished = false;
          this.isEmpty = false;
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

<style rel="stylesheet/scss" lang="scss">
.user-order-list {
  height: 100%;
  padding-bottom: 60px;
  .order-list-content {
    padding-top: 8px;
  }
  .better-scroll-content {
    padding: 80px 0 0px;
  }
  .better-scroll-list-wrapper {
    padding-bottom: 0;
  }
}
</style>
