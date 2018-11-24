<template>
  <div class="order-pay">
    <header-nav :title="headerTitle" :on-left="true" @click-left="back" />
    <div class="order-pay-info">
      <div class="residual-time">
        剩余时间{{this.coutMin | formatTime}}:{{this.coutSec | formatTime}}
      </div>
      <div class="pay-price">
        ￥<span class="content">{{price}}</span>
      </div>
      <div class="order-info">
        {{shopTitle}}
      </div>
    </div>
    <div class='footer-box' @click="pay">
      <span>确认支付￥</span><span class="content">{{price}}</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import headerNav from '@/views/dumb/header-nav';
import timer from '@/mixins/timer';

export default {
  name: 'OrderPay',
  mixins: [timer],
  data() {
    return {
      headerTitle: '支付订单',
    };
  },
  components: {
    headerNav,
  },
  methods: {
    back() {
      this.$router.push({
        path: '/user/order/detail',
        query: { orderId: this.orderId },
      });
    },
    cancelOrder() {
      this.$router.push({
        path: '/user/index',
      });
    },
    pay() {
      this.$store
        .dispatch('order/payOrder', { id: this.orderId })
        .then(resp => {
          console.log(resp.data);

          this.$toast(resp.data.message);
          this.$router.push({
            name: 'userOrderDetail',
            params: { id: this.orderId },
          });
        })
        .catch(err => {
          console.log(err);
          this.$toast(err);
        });
    },
  },
  mounted() {
    if (!this.orderId) {
      this.$toast('非法访问');
      this.$router.push('/user/order/list');
      return;
    }
    this.initCount(this.deadLineTime, this.cancelOrder.bind(this));
  },
  computed: {
    orderId() {
      return this.$route.params.orderId;
    },
    deadLineTime() {
      return this.$route.params.deadLineTime;
    },
    price() {
      return this.$route.params.price;
    },
    shopTitle() {
      return this.$route.params.shopTitle;
    },
  },
  filters: {
    formatTime(time) {
      return time < 10 ? '0' + time : time;
    },
  },
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
