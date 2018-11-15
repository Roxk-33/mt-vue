<template>
  <div class="order-list-item">
    <div class="item-header mt-flex-space-between">
      <div class="item-header-left">
        <img :src="shopInfo.photo" alt="">
        <div class="item-header-shop-info">
          <span class="shop-info-name">{{shopInfo.shop_title}}</span>
          <i class='iconfont icon-xiangyou'></i>
        </div>
      </div>
      <div class="item-header-right">
        <p>订单已完成</p>
      </div>
    </div>
    <router-link class="item-content" :to="{  path: '/user/order/detail',query:{orderId:this.orderId}}">
      <div class="item-content-info">
        <span class="info-name">{{foodList[0] && foodList[0].food_name}}</span>
        <span class="info-num">等<i>{{foodList.length}}</i>件商品</span>
        <p class="order-price">￥15</p>
      </div>
      <div class="item-content-btn-box">
        <span class="item-content-btn">再来一单</span>
        <span class="item-content-btn">再来一单</span>
        <span class="item-content-btn evaluation-btn" @click.stop="gotoEva">评价</span>
      </div>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'order-list-item',
  props: {
    orderInfo: Object,
    foodList: Array,
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    gotoEva() {
      this.$router.push('/user/order/evaluation');
    },
  },
  computed: {
    shopInfo() {
      if (!this.orderInfo) return {};
      return this.orderInfo.shop_info;
    },
    orderId() {
      return this.orderInfo.id;
    },
  },
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
@import '~css/common';
.order-list-item {
  background-color: #fff;
  margin: 0 auto 10px;
  width: 90%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 10px;
  .item-header {
    margin-bottom: 10px;
    .item-header-left {
      text-align: left;
      img {
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
      .item-header-shop-info {
        display: inline-block;
        vertical-align: middle;
        .shop-info-name {
          margin-left: 10px;
          font-size: 14px;
        }
        i {
          font-size: 12px;
        }
      }
    }
    .item-header-right {
      line-height: 30px;
    }
  }
  .item-content {
    border-top: 1px solid #cccccc;
    margin-left: 45px;
    padding: 10px 0;
    .item-content-info {
      text-align: left;
      margin-left: 44px;
      span {
        font-size: 14px;
        color: #5d5b5b;
      }
      .info-num {
        margin-left: 10px;
        i {
          font-style: normal;
          margin: 0 5px;
        }
      }
      .order-price {
        float: right;
        font-weight: 600;
        font-size: 15px;
      }
    }
    .item-content-btn-box {
      text-align: right;
      margin-top: 20px;
      .item-content-btn {
        display: inline-block;
        text-align: center;
        width: 60px;
        box-sizing: border-box;
        padding: 5px;
        border: 1px solid #cccccc;
        &.evaluation-btn {
          background-color: $mt-color;
          border-color: $mt-color;
        }
      }
    }
  }
}
</style>
