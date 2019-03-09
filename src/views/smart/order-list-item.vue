<template>
  <div class="order-list-item">
    <div class="item-header mt-flex-space-between">
      <div class="item-header-left">
        <img v-lazy="shopInfo.photo" alt />
        <router-link
          class="item-header-shop-info"
          :to="{ path: `/shop/list/${shopInfo.id}` }"
        >
          <span class="shop-info-name">{{ shopInfo.shop_title }}</span>
          <i class="iconfont icon-xiangyou" />
        </router-link>
      </div>
      <div class="item-header-right">
        <p>{{ ORDER_STATUS[orderInfo.status] }}</p>
      </div>
    </div>
    <div class="item-content" @click="gotoDetail">
      <div class="item-content-info">
        <span class="info-name">{{
          foodList[0] && foodList[0].food_name
        }}</span>
        <span class="info-num">
          等
          <i>{{ foodList.length }}</i
          >件商品
        </span>
        <p class="order-price">￥15</p>
      </div>
      <div class="item-content-btn-box">
        <span
          v-if="['UNPAY', 'PAY', 'ONTHEWAY'].includes(orderInfo.status)"
          class="item-content-btn"
          @click.stop="cancel"
          >取消订单</span
        >
        <router-link
          class="item-content-btn mt-color"
          :to="{ name: 'orderPay', params: { orderId: orderId } }"
          v-if="orderInfo.status === 0"
          >立即支付</router-link
        >
        <!-- <router-link
          class="again item-content-btn"
          :to="{ name: 'shopDetail', params: { id: shopInfo.id }}"
          v-if="['ORDER_CANCEL','ORDER_CANCEL_TIMEOUT','ORDER_SUCCESS'].includes(orderInfo.status) "
        >再来一单</router-link> -->

        <span
          class="item-content-btn mt-color"
          v-if="
            orderInfo.status === 'ORDER_SUCCESS' &&
              orderInfo.review_status !== 1
          "
          @click.stop="gotoReview"
          >评价</span
        >
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import CONSTANT from "@/common/constant";

export default {
  name: "OrderListItem",
  props: {
    orderInfo: Object,
    foodList: Array
  },
  data() {
    return {
      ORDER_STATUS: CONSTANT.ORDER_STATUS
    };
  },
  methods: {
    cancel() {
      this.$emit("cancelOrder", this.orderId);
    },
    gotoDetail() {
      this.$router.push({
        name: "userOrderDetail",
        params: { id: this.orderId }
      });
    },
    gotoReview() {
      this.$router.push({
        name: "userOrderReview",
        params: { orderId: this.orderId }
      });
    }
  },

  computed: {
    shopInfo() {
      if (!this.orderInfo) return {};
      return this.orderInfo.shop_info;
    },
    orderId() {
      return this.orderInfo.id;
    },
    orderStatus() {
      return this.orderInfo.status;
    }
  }
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.order-list-item {
  background-color: #fff;
  margin: 0 auto 10px;
  width: 90%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 10px;
  .item-header {
    padding-bottom: 5px;
    margin-bottom: 5px;
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
      p {
        color: $mt-gray;
      }
    }
  }
  .item-content {
    border-top: 1px solid #cccccc;
    margin-left: 38px;
    padding: 10px 0;
    .item-content-info {
      text-align: left;
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
        margin-right: 5px;
        border: 1px solid #dfdfdf;
        &:last-child {
          margin-right: 0;
        }
        &.mt-color {
          background-color: $mt-color;
          border-color: $mt-color;
        }
      }
    }
  }
}
</style>
