<template>
  <div class="user-order-detail">
    <div class="detail-top">
      <div class="icons">
        <router-link to="/user/order/list">
          <i class="iconfont icon-xiangzuo" />
        </router-link>
      </div>
      <p class="order-progress" @click="showStatusTimeList = true">
        {{ ORDER_STATUS[orderStatus] }}
        <i class="iconfont icon-xiangyou" />
      </p>
    </div>
    <!-- 当订单未支付时显示 -->
    <div class="detail-box detail-other" v-if="orderStatus === 'UNPAY'">
      <i class="iconfont icon-bell" />
      请在{{ this.coutMin }}{{ this.coutSec }}分钟内完成支付，超时将自动取消
    </div>
    <div class="detail-box detail-other">
      <p v-if="orderStatus !== 'UNPAY'">{{ ORDER_STATUS_MSG[orderStatus] }}</p>
      <p v-else>
        预计<span class="arrival-time">{{
          orderStatusTimeArr.predict_arrival_time | parseTime("{h}:{i}")
        }}</span
        >送达
      </p>
      <div class="detail-top-btn">
        <!-- <span
          class="mt-color"
          v-if="['ACCEPT', 'ONTHEWAY'].includes(orderStatus)"
        >
          催单
        </span> -->
        <span
          v-if="['UNPAY', 'PAY', 'ACCEPT', 'ONTHEWAY'].includes(orderStatus)"
          @click="cancelOrder"
        >
          取消订单
        </span>
        <span class="mt-color" v-if="orderStatus === 'UNPAY'" @click="goPay">
          立即支付
        </span>
        <!-- <router-link
          class="again"
          :to="{ name: 'shopDetail', params: { id: this.orderId } }"
          v-if="['ORDER_SUCCESS', 'ORDER_CANCEL'].includes(orderStatus)"
        >
          再来一单
        </router-link> -->
        <span
          class="after-sale"
          v-if="['ONTHEWAY'].includes(orderStatus)"
          @click="confirmOrder"
        >
          确认送达
        </span>
        <router-link
          class="after-sale"
          to="/order/evaluation"
          v-if="orderStatus === 'ORDER_SUCCESS'"
        >
          申请售后
        </router-link>
        <router-link
          class="mt-color"
          v-if="
            orderStatus === 'ORDER_SUCCESS' && orderInfo.review_status !== 1
          "
          :to="{
            name: 'userOrderReview',
            params: { orderId: this.orderId }
          }"
        >
          评价
        </router-link>
      </div>
    </div>
    <div class="detail-box good-box">
      <div class="detail-box-title">
        <router-link
          class="shop-title"
          :to="{ path: `/shop/list/${shopInfo.id}` }"
        >
          {{ shopInfo.shop_title }}
          <i class="iconfont icon-xiangyou" />
        </router-link>

        <!-- <div class="shop-info-contact">
          <span>
            <i class="iconfont icon-dianhua" />
          </span>
          <span>
            <i class="iconfont icon-duanxin" />
          </span>
        </div> -->
      </div>

      <div class="detail-box-item detail-content">
        <div
          class="detail-content-item"
          v-for="item in foodList"
          :key="item.id"
        >
          <img class="good-img" :src="item.food_picture" alt="" />
          <div class="good-info">
            <div class="good-info-header">
              <div class="mt-flex-space-between">
                <span class="good-info-name">{{ item.food_name }}</span>
              <span class="good-info-price">￥{{ item.price }}</span>
              </div>
              <p v-if="item.spec_text.length" class="good-info-spec">
                {{ item.spec_text.join(",") }}
              </p>
            </div>
            <p class="good-info-num">x{{ item.num }}</p>
          </div>
        </div>
      </div>
      <div class="detail-box-item mt-flex-space-between detail-distribution">
        <span>配送费</span>
        <span>￥{{ shopInfo.freight }}</span>
      </div>
      <div class="detail-box-item detail-price-total">
        <span>合计</span>
        <span>￥{{ orderInfo.total_price }}</span>
      </div>
    </div>
    <div
      class="detail-box review-box mt-flex-space-between"
      v-if="orderInfo.review_status === 1"
      @click="showReview = true"
    >
      <span>我的评价</span>
      <i class="iconfont icon-xiangyou"></i>
    </div>
    <div class="detail-box distribution-box">
      <p class="detail-box-title">配送信息</p>
      <ul class="distribution-info-box">
        <li class="mt-flex-space-between">
          <span class="info-box-title">配送服务</span>
          <span class="info-box-content">商家配送</span>
        </li>
        <li class="mt-flex-space-between">
          <span class="info-box-title">期望时间</span>
          <span class="info-box-content">立即配送</span>
        </li>
      </ul>
    </div>
    <div class="detail-box order-box">
      <p class="detail-box-title">订单信息</p>
      <ul class="order-box-info-box">
        <li class="mt-flex-space-between">
          <span class="info-box-title">订单号码</span>
          <span class="info-box-content">{{ orderInfo.id }}</span>
        </li>
        <li class="mt-flex-space-between">
          <span class="info-box-title">下单时间</span>
          <span class="info-box-content">{{
            orderStatusTimeArr.created_at | parseTime
          }}</span>
        </li>
        <li class="mt-flex-space-between">
          <span class="info-box-title">支付方式</span>
          <span class="info-box-content">在线支付</span>
        </li>
      </ul>
    </div>
    <van-popup v-model="showStatusTimeList" position="bottom" :overlay="true">
      <pop-up
        @cancel="showStatusTimeList = false"
        headerTitle="订单跟踪"
        :showBottomText="false"
      >
        <ul class="order-status-time">
          <li
            class="order-status-time-item"
            v-for="(item, index) in orderStatusTimeList"
            :key="index"
            :class="{ latest: index === orderStatusTimeList.length - 1 }"
          >
            <div class="item-left">
              <div class="dot"></div>
              {{ item.label }}
            </div>
            <div class="item-right">{{ item.time }}</div>
          </li>
        </ul>
      </pop-up>
    </van-popup>

    <van-popup v-model="showReview" position="right" :overlay="true">
      <order-review-detail
        :shopInfo="shopInfo"
        :reviewInfo="orderInfo.order_review"
        @close="showReview = false"
      />
    </van-popup>
  </div>
</template>

<script type="text/ecmascript-6">
import { parseTime } from "@/common/utils";
import CONSTANT from "@/common/constant";
import timer from "@/mixins/timer";
import popUp from "@/views/dumb/pop-up";
import orderReviewDetail from "@/views/smart/order-review-detail";

export default {
  name: "UserOrderDetail",
  mixins: [timer],
  components: {
    popUp,
    orderReviewDetail
  },
  data() {
    return {
      orderInfo: {},
      ORDER_STATUS: CONSTANT.ORDER_STATUS,
      ORDER_STATUS_MSG: CONSTANT.ORDER_STATUS_MSG,
      ORDER_STATUS_TIME_MSG: CONSTANT.ORDER_DETAIL_STATUS_TIME,
      showStatusTimeList: false,
      orderStatusTimeList: [],
      showReview: false
    };
  },
  methods: {
    getData() {
      this.mtLoading = true;
      this.$store
        .dispatch("order/getOrderDetail", this.orderId)
        .then(resp => {
          this.mtLoading = false;
          this.orderInfo = resp.data;
          if (this.orderStatus === "UNPAY") {
            this.initCount(
              this.orderStatusTimeArr.deadline_pay_time,
              this.cancelOrder.bind(this, 1)
            );
          }
          this.orderStatusTimeList = [];
          Object.keys(this.ORDER_STATUS_TIME_MSG).forEach(key => {
            let obj = {};
            if (!!this.orderStatusTimeArr[key]) {
              obj.label = this.ORDER_STATUS_TIME_MSG[key];
              obj.time = parseTime(
                this.orderStatusTimeArr[key],
                "{y}-{m}-{d} {h}:{i}"
              );
              this.orderStatusTimeList.push(obj);
            }
          });
        })
        .catch(err => {
          this.mtLoading = false;
          this.$toast(err);
          this.$router.back(-1);
        });
    },
    confirmOrder() {
      this.$store
        .dispatch("order/confirmOrder", {
          orderId: this.orderId,
          data: { shopId: this.shopInfo.id }
        })
        .then(resp => {
          this.getData();
        })
        .catch(err => {
          console.log(err);
          this.$toast(err);
        });
    },
    cancelOrder(isTimeOut = 0) {
      this.$store
        .dispatch("order/cancelOrder", { orderId: this.orderId, isTimeOut })
        .then(resp => {
          this.getData();
        })
        .catch(err => {
          console.log(err);
          this.$toast(err);
        });
    },
    goPay() {
      this.$router.push({
        name: "orderPay",
        params: {
          orderId: this.orderInfo.id,
          price: this.orderInfo.total_price,
          shopTitle: this.shopInfo.shop_title,
          deadLineTime: this.orderStatusTimeArr.deadline_pay_time
        }
      });
    }
  },
  mounted() {
    this.getData();
  },
  computed: {
    orderId() {
      return this.$route.params.id;
    },
    shopInfo() {
      return this.orderInfo.shop_info || {};
    },
    foodList() {
      if (!this.orderInfo) return {};
      return this.orderInfo.food_list;
    },
    orderStatus() {
      return this.orderInfo.status;
    },
    orderStatusTimeArr() {
      if (!!this.orderInfo.order_status) {
        return this.orderInfo.order_status;
      }
      return {};
    }
  },
  filters: {
    parseTime(val, cFormat = null) {
      return parseTime(val, cFormat);
    }
  }
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.user-order-detail {
  padding: 80px 10px 0;
  .icon-xiangyou {
    color: #2c3e50;
  }
  .detail-top {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 80px;
    padding: 0 10px;
    background-color: whitesmoke;
    z-index: $zindex-header;
    .icons {
      margin-bottom: 10px;
      padding-top: 10px;
      a {
        display: inline-block;
        width: 20px;
        text-align: center;
        line-height: 20px;
        height: 20px;
        margin: 0 5px;
        border-radius: 50%;
        background-color: #827e7e;
      }
      i {
        color: #fff;
        margin-left: -2px;
      }
    }
    .order-progress {
      font-size: 22px;
      margin-bottom: 15px;
      display: flex;
      i {
        font-size: 20px;
      }
    }
  }

  .detail-box {
    background-color: #fff;
    padding: 8px;
    margin-bottom: 10px;
    .detail-box-title {
      font-size: 16px;
      padding-bottom: 5px;
      height: 28px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid $mt-boder-color;
      justify-content: space-between;
      .shop-title {
        display: flex;
        height: 18px;
        line-height: 18px;
        font-weight: 600;
      }
    }
  }
  .detail-other {
    padding: 12px 8px 0;
    margin-bottom: 0;
    p {
      font-size: 15px;
      margin-bottom: 15px;
    }
    .arrival-time {
      color: #5353fb;
      font-weight: 600;
      margin: 0 3px;
    }
    .icon-bell {
      vertical-align: middle;
      background-color: #e8e5e5;
      border-radius: 50%;
      color: #c0bfbf;
      padding: 1px;
      margin-right: 5px;
    }
    .detail-top-btn {
      > a,
      > span {
        height: 20px;
        line-height: 20px;
        padding: 2px 10px;
        display: inline-block;
        border: 1px solid #cccccc;
        margin-right: 8px;
      }
      .mt-color {
        background-color: $mt-color;
        border-color: $mt-color;
      }
    }
  }
  .good-box {
    .detail-box-item {
      padding: 15px 0 10px 0;
      border-bottom: 1px solid $mt-boder-color;
    }
    .detail-box-title {
      .icon-xiangyou {
        font-size: 12px;
        color: #bababa;
      }
    }

    .shop-info-contact {
      float: right;
      span {
        display: inline-block;
        margin: 0 5px;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        border: 1px solid #cccccc;
        text-align: center;
        line-height: 16px;
      }
      i {
        font-size: 12px;
      }
    }
    .detail-distribution {
      font-size: 14px;
    }
    .detail-price-total {
      text-align: right;
      span {
        &:last-child {
          font-size: 19px;
        }
      }
    }
    .detail-content-item {
      &:not(:first-child) {
        margin-top: 10px;
      }
      .good-img {
        width: 60px;
        height: 60px;
        float: left;
      }
      .good-info {
        margin-left: 70px;
        height: 60px;
        position: relative;
        .good-info-name {
          font-size: 16px;
        }
        .good-info-price {
          font-size: 16px;
        }
        .good-info-spec {
          margin-top: 0.1rem;
        }
        .good-info {
          display: inline-block;
        }
        .good-info-num {
          position: absolute;
          bottom: 0;
        }
      }
    }
  }

  .distribution-box,
  .order-box {
    ul {
      margin-top: 10px;
    }
  }
  .review-box {
    font-size: 16px;
  }
  .order-box-info-box li,
  .distribution-info-box li {
    margin: 5px 0;
    font-size: 14px;
    .info-box-title {
      color: #797979;
    }
  }
  .order-status-time {
    padding: 12px;
    font-size: 15px;
    .order-status-time-item {
      display: flex;
      justify-content: space-between;
      color: $mt-gray;
      margin-bottom: 28px;
      .item-left {
        position: relative;
        padding-left: 13px;
        .dot {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: $mt-gray;
          &::after {
            content: "";
            display: inline-block;
            width: 1px;
            height: 36px;
            position: absolute;
            background-color: $mt-gray;
            left: 50%;
            bottom: -35px;
            transform: translateX(-50%) scale(0.5);
          }
        }
      }
      &.latest {
        color: #000;
        .item-left .dot {
          border: 2px solid $mt-color;
          box-sizing: border-box;
          width: 9px;
          height: 9px;
          background-color: #fff;
          &::after {
            display: none;
          }
        }
      }
    }
  }
}
.van-popup--right {
  width: 100%;
  height: 100%;
}
</style>
