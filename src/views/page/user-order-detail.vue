<template>
  <div class="user-order-detail">
    <div class="detail-top">
      <div class="icons">
        <router-link to="/order/list">
          <i class="iconfont icon-xiangzuo"></i>
        </router-link>
      </div>
      <p class="order-progress">
        订单完成
        <i class='iconfont icon-xiangyou'></i>
      </p>
    </div>
    <div class="detail-box detail-other">
      <p>感谢您对美团外卖的信任，期待再次光临</p>
      <div class="detail-top-btn">
        <router-link class="again" to="/order/evaluation">再来一单</router-link>
        <router-link class="after-sale" to="/order/evaluation">申请售后</router-link>
        <router-link class="evaluation" to="/order/evaluation">评价</router-link>
      </div>
    </div>
    <div class="detail-box good-box">
      <div class="detail-box-title">
        <span>{{shopInfo.shop_title}}</span>
        <i class='iconfont icon-xiangyou'></i>

        <div class="shop-info-contact">
          <span>
            <i class='iconfont icon-dianhua'></i>
          </span>
          <span>
            <i class='iconfont icon-duanxin'></i>
          </span>
        </div>

      </div>

      <div class="detail-box-item detail-content">
        <div class="detail-content-item" v-for="item in foodList" :key="item.id">
          <img class="good-img" :src="item.food_picture" alt="">
          <div class="good-info">
            <div class="good-info-header mt-flex-space-between">
              <span class="good-info-name">{{item.food_name}}</span>
              <span class="good-info-price">￥{{item.price}}</span>
            </div>
            <p class="good-info-num">x{{item.num}}</p>
          </div>
        </div>
      </div>
      <div class="detail-box-item mt-flex-space-between detail-distribution">
        <span>配送费</span>
        <span>￥{{shopInfo.freight}}</span>
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
          <span class="info-box-content">123456</span>
        </li>
        <li class="mt-flex-space-between">
          <span class="info-box-title">下单时间</span>
          <span class="info-box-content">{{orderInfo.created_at}}</span>
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
export default {
  name: 'user-order-detail',

  data() {
    return {
      orderInfo: {},
    };
  },
  components: {},
  methods: {
    getData() {
      this.$store.dispatch('order/getOrderDetail', this.orderId).then(resp => {
        this.orderInfo = resp.data;
      });
    },
  },
  created() {
    this.getData();
  },
  computed: {
    orderId() {
      return this.$route.params.orderId || 1;
    },
    shopInfo() {
      if (!this.orderInfo) return {};
      return this.orderInfo.shop_info;
    },
    foodList() {
      if (!this.orderInfo) return {};
      return this.orderInfo.food_list;
    },
  },
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
      border-bottom: 1px solid #cccccc;
    }
  }
  .detail-other {
    p {
      font-size: 15px;
      margin-bottom: 15px;
    }
    .detail-top-btn {
      > a {
        height: 20px;
        line-height: 20px;
        padding: 2px 10px;
        display: inline-block;
        border: 1px solid #cccccc;
      }
      .again,
      .evaluation {
        background-color: $mt-color;
        border-color: $mt-color;
      }
    }
  }
  .good-box {
    .detail-box-item {
      padding: 15px 0 10px 0;
      border-bottom: 1px solid #cccccc;
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
      font-size: 18px;
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
    font-size: 16px;
    .info-box-title {
      color: #797979;
    }
  }
}
</style>
