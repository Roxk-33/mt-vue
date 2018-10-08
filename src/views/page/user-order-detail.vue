<template>
  <div class="user-order-detail">
    <div class="detail-top">
      <div class="icons">
        <span>
          <i class="iconfont icon-xiangzuo"></i>
        </span>
      </div>
      <p class="order-progress">
        订单完成
        <i class='iconfont icon-xiangyou'></i>
      </p>
    </div>

    <div class="detail-box good-box">
      <div class="detail-box-title">
        <span>李功夫中华鸡排</span>
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
      <div class="detail-content  detail-box-item">
        <div class="detail-content-item">
          <img class="good-img" src="https://via.placeholder.com/80x80" alt="">
          <div class="good-info">
            <div class="good-info-header mt-flex-space-between">
              <span class="good-info-name">原香鸡排 </span>
              <span class="good-info-price">￥5</span>
            </div>
            <p class="good-info-num">x1</p>
          </div>
        </div>
        <div class="detail-content-item">
          <img class="good-img" src="https://via.placeholder.com/80x80" alt="">
          <div class="good-info">
            <div class="good-info-header mt-flex-space-between">
              <span class="good-info-name">原香鸡排 </span>
              <span class="good-info-price">￥5</span>
            </div>
            <p class="good-info-num">x1</p>
          </div>
        </div>
      </div>
      <div class="detail-box-item mt-flex-space-between detail-distribution">
        <span>配送费</span>
        <span>￥0</span>
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
          <span class="info-box-content">2018-10-10 12:12</span>
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
    return {};
  },
  components: {},
  methods: {},
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.user-order-detail {
  padding: 80px 10px 0;
  .icon-xiangyou {
    color: #2c3e50;
  }
  .detail-top{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 80px;
    padding: 0 10px;
    .icons {
      margin-bottom: 15px;
      span {
        display: inline-block;
        width: 20px;
        text-align: center;
        line-height: 20px;
        height: 20px;
        margin: 0 5px;
        border-radius: 50%;
        background-color: #000;
      }
      i {
        color: #fff;
      }
    }
    .order-progress {
      font-size: 25px;
      font-weight: 600;
      margin-bottom: 15px;
      i {
        font-size: 15px;
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
      color: #000;
      height: 28px;
      border-bottom: 1px solid #cccccc;
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
        padding: 3px;
        border: 1px solid #cccccc;
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
          color: #000;
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
    .info-box-content {
      color: #000;
    }
  }
}
</style>
