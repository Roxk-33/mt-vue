<template>
  <div class="order-pay">
    <header-nav :title="headerTitle" :left-click="true" @left-click-fn="back" />
    <div class="order-pay-info">
      <div class="residual-time">
        剩余时间{{ this.coutMin }}:{{ this.coutSec }}
      </div>
      <div class="pay-price">
        ￥<span class="content">{{ payData.price }}</span>
      </div>
      <div class="order-info">
        {{ payData.shopTitle }}
      </div>
    </div>
    <div class="footer-box" @click="pay">
      <span>确认支付￥</span><span class="content">{{ payData.price }}</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import headerNav from "@/views/dumb/header-nav";
import timer from "@/mixins/timer";

export default {
  name: "OrderPay",
  mixins: [timer],
  data() {
    return {
      headerTitle: "支付订单",
      payData: {
        price: 0,
        shopTitle: "",
        deadLineTime: 0
      }
    };
  },
  components: {
    headerNav
  },
  methods: {
    back() {
      this.$router.push({
        name: "userOrderDetail",
        params: { id: this.orderId }
      });
    },

    cancelOrder() {
      this.$store
        .dispatch("order/cancelOrder", { orderId: this.orderId, isTimeOut: 1 })
        .then(resp => {
          this.$router.push({
            name: "userOrderDetail",
            params: { id: this.orderId }
          });
        })
        .catch(err => {
          console.log(err);
          this.$toast(err);
        });
    },
    getPayData() {
      this.$store.dispatch("order/getPayData", this.orderId).then(resp => {
        this.payData.price = resp.data.total_price;
        this.payData.shopTitle = resp.data.shop_info.shop_title;
        this.initCount(
          resp.data.order_status.deadline_pay_time,
          this.cancelOrder.bind(this)
        );
      });
    },
    pay() {
      this.$store
        .dispatch("order/payOrder", { id: this.orderId })
        .then(resp => {
          this.$toast(resp.message);
          this.$router.push({
            name: "userOrderDetail",
            params: { id: this.orderId }
          });
        })
        .catch(err => {
          console.log(err);
          this.$toast(err);
        });
    }
  },
  mounted() {
    if (!this.orderId) {
      this.$toast("非法访问");
      this.$router.push("/user/order/list");
      return;
    }
    this.getPayData();
  },
  computed: {
    orderId() {
      return this.$route.params.orderId;
    }
  }
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.order-pay-info {
  text-align: center;
  margin-top: 20px;
  padding: 10px 0;
  background-color: #fff;
  font-size: 15px;
  .residual-time {
    color: $mt-gray;
  }
  .pay-price {
    margin: 10px 0 5px;
    .content {
      font-size: 24px;
      font-weight: 600;
    }
  }
  .order-info {
    font-size: 14px;
    color: $mt-gray;
  }
}
.footer-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  height: 1.2rem;
  line-height: 1.2rem;
  background-color: $mt-color;
  span {
    vertical-align: middle;
  }
  .content {
    font-size: 20px;
    font-weight: 600;
  }
}
</style>
