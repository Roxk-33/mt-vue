<template>
  <div class="user-order-detail">
    <div class="detail-top">
      <div class="icons">
        <router-link to="/user/order/list">
          <i class="iconfont icon-xiangzuo" />
        </router-link>
      </div>
      <p class="order-progress">
        {{ ORDER_STATUS[orderStatus] }}
        <i class='iconfont icon-xiangyou' />
      </p>
    </div>
    <!-- 当订单未支付时显示 -->
    <div
      class="detail-box detail-other"
      v-if="orderStatus === 'UNPAY'"
    >
      <i class="iconfont icon-bell" />
      请在{{this.coutMin | formatTime}}:{{this.coutSec | formatTime}}分钟内完成支付，超时将自动取消

    </div>
    <div class="detail-box detail-other">
      <p v-if="orderStatus !== 'UNPAY'">{{ ORDER_STATUS_MSG[orderStatus] }}</p>
      <p v-else>预计<span class="arrival-time">{{ orderInfo.arrival_time.substr(-5) }}</span>送达</p>
      <div class="detail-top-btn">
        <span
          v-if="orderStatus === 'UNPAY'"
          @click="cancelOrder"
        >取消订单</span>
        <router-link
          class="mt-color"
          :to="{ name: 'orderPay', params: { orderId: this.orderId }}"
          v-if="orderStatus === 'UNPAY'"
        >立即支付</router-link>
        <router-link
          class="again"
          :to="{ name: 'shopDetail', params: { orderId: this.orderId }}"
          v-if="orderStatus === 'ORDER_SUCCESS' ||orderStatus === 'ORDER_CANCEL'"
        >再来一单</router-link>
        <router-link
          class="after-sale"
          to="/order/evaluation"
          v-if="orderStatus === 'ORDER_SUCCESS'"
        >申请售后</router-link>
        <router-link
          class="mt-color"
          v-if="orderStatus === 'ORDER_SUCCESS'"
          :to="{path: '/user/order/evaluation', query: { orderId: this.orderId }}"
        >评价</router-link>
      </div>
    </div>
    <div class="detail-box good-box">
      <div class="detail-box-title">
        <span class="shop-title">{{ shopInfo.shop_title }}</span>
        <i class='iconfont icon-xiangyou' />

        <div class="shop-info-contact">
          <span>
            <i class='iconfont icon-dianhua' />
          </span>
          <span>
            <i class='iconfont icon-duanxin' />
          </span>
        </div>

      </div>

      <div class="detail-box-item detail-content">
        <div
          class="detail-content-item"
          v-for="item in foodList"
          :key="item.id"
        >
          <img
            class="good-img"
            :src="item.food_picture"
            alt=""
          >
          <div class="good-info">
            <div class="good-info-header mt-flex-space-between">
              <span class="good-info-name">{{ item.food_name }}</span>
              <span class="good-info-price">￥{{ item.price }}</span>
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
        <span>￥15</span>
      </div>
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
          <span class="info-box-content">{{ orderInfo.created_at | parseTime }}</span>
        </li>
        <li class="mt-flex-space-between">
          <span class="info-box-title">支付方式</span>
          <span class="info-box-content">在线支付</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { parseTime } from '@/common/utils';
import CONSTANT from '@/common/constant';
import timer from '@/mixins/timer';

export default {
  name: 'UserOrderDetail',
  mixins: [timer],
  data() {
    return {
      orderInfo: {},
      ORDER_STATUS: CONSTANT.ORDER_STATUS,
      ORDER_STATUS_MSG: CONSTANT.ORDER_STATUS_MSG,
      coutMin:0,
      coutSec:0,
    };
  },
  components: {},
  methods: {
    getData() {
      this.mtLoading = true;
      this.$store
        .dispatch('order/getOrderDetail', this.orderId)
        .then((resp) => {
          this.mtLoading = false;
          this.orderInfo = resp.data;
          if(this.orderStatus === 'UNPAY'){
            this.initCount(this.orderInfo.deadline_pay_time,this.cancelOrder.bind(this,'timeout'));
          }
        })
        .catch((err) => {
          this.mtLoading = false;
          this.$toast(err);
          this.$router.back(-1);
        });
    },
    cancelOrder(action = 'normal') {
      this.$store
        .dispatch('order/cancelOrder', {id : this.orderId, action})
        .then((resp) => {
          this.getData();
        })
        .catch((err) => {
          console.log(err);
          this.$toast(err);
        });
    },
  },
  created() {
    this.getData();
  },
  computed: {
    orderId() {
      return this.$route.query.orderId;
    },
    shopInfo() {
      if (!this.orderInfo.shop_info) return { shop_title: '' };
      return this.orderInfo.shop_info;
    },
    foodList() {
      if (!this.orderInfo) return {};
      return this.orderInfo.food_list;
    },
    orderStatus(){
      return this.orderInfo.status;
    }

  },
  filters: {
    parseTime(val) {
      return parseTime(val);
    },
    formatTime(time){
      return time < 10 ? '0'+ time : time;
    }
  },
  watch:{
    countTime(val){
      this.coutMin = Math.floor(val/60);
      this.coutSec = Math.floor(val - this.coutMin*60);
    }
  }
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
@import '~css/common';

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
      font-size: 18px;
      padding-bottom: 5px;
      height: 28px;
      border-bottom: 1px solid $mt-boder-color;
      .shop-title {
        font-weight: 600;
      }
    }
  }
  .detail-other {
    padding: 12px 8px;
    p {
      font-size: 15px;
      margin-bottom: 15px;
    }
    .arrival-time {
      color: #5353fb;
      font-weight: 600;
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
  .order-box-info-box li,
  .distribution-info-box li {
    margin: 5px 0;
    font-size: 14px;
    .info-box-title {
      color: #797979;
    }
  }
}
</style>
