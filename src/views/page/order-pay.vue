<template>
  <div class="order-pay">
    <header-nav
      :title="headerTitle"
      :on-left="true"
      @click-left="back"
    />
    <div class="order-pay-info">
      <div class="residual-time">
        剩余时间15:40
      </div>
      <div class="pay-price">
        ￥<span class="content">15.8</span>
      </div>
      <div class="order-info">
        木桶饭
      </div>
    </div>

    <div class='footer-box'>
      <span>确认支付￥</span><span class="content">15.8</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import headerNav from '@/views/dumb/header-nav';

export default {
  name: 'OrderPay',

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
  },
  computed: {
    orderId() {
      return this.$route.params.orderId;
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
