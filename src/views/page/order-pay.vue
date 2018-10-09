<template>
  <div class="order-pay">
    <van-nav-bar :title="headerTitle" left-text="" left-arrow @click-left="$router.back(-1);" />
    <div class='order-pay-header'>
      <div class='header-address box-right-arrow'>
        <p class='address-content'>广东财经大学</p>
        <span class='address-person'>肖志豪 18024589062</span>
        <i class='iconfont icon-xiangyou'></i>
      </div>
      <div class='header-shipping-time box-right-arrow mt-flex-space-between'>
        <span class='shipping-type'>立即送出</span>
        <span class='shipping-time'>23:20</span>
        <i class='iconfont icon-xiangyou'></i>

      </div>
    </div>
    <div class='order-pay-main'>
      <div class='main-header order-pay-main-item'>
        <span>潮爷的虾</span>
      </div>
      <ul class='main-food-list order-pay-main-item'>
        <li class='food-list-item'>
          <div class='food-pic'>
            <img>
          </div>
          <!-- TODO:样式实现较差，需要优化 -->
          <div class='food-info'>
            <div class='food-info-main mt-flex-space-between'>
              <div class='food-info-name'>
                香辣小龙虾
                <span class='food-info-discount'>折</span>
              </div>
              <div class='food-info-price'>
                <span class='food-info-price_original'>￥64</span>
                ￥48.8
              </div>
            </div>
            <!-- 规格 -->
            <p class='food-info-type'>香辣</p>
            <p class='food-info-num'>x1</p>
          </div>
        </li>
        <li class='food-list-item'>
          <div class='food-pic'>
            <img>
          </div>
          <div class='food-info'>
            <div class='food-info-main mt-flex-space-between'>
              <div class='food-info-name'>
                香辣小龙虾
                <span class='food-info-discount'>折</span>
              </div>
              <div class='food-info-price'>
                <span class='food-info-price_original'>￥64</span>
                ￥48.8
              </div>
            </div>
            <!-- 规格 -->
            <p class='food-info-type'>香辣</p>
            <p class='food-info-num'>x1</p>
          </div>
        </li>
      </ul>
      <div class='food-fee'>
        <div>
          <span class='food-fee-title'>包装费</span>
          <span class='food-fee-price'>￥16</span>
        </div>
        <div>
          <span class='food-fee-title'>配送费</span>
          <span class='food-fee-price'>￥2</span>
        </div>
      </div>
      <div class='food-pay'>
        <span>已优惠
          <i class='food-pay-discount'>￥21.2</i>
        </span>
        <span>小计
          <i class='food-pay-total'>￥64.8</i>
        </span>
      </div>

    </div>
    <div class='order-pay-note'>
      <div class='order-pay-note-item box-right-arrow' @click="showRemarks = true">
        <span class='note-item-left'>备注</span>
        <span class='note-item-right'></span>
        <i class='iconfont icon-xiangyou'></i>

      </div>
      <div class='order-pay-note-item box-right-arrow mt-flex-space-between'>
        <span class='note-item-left'>餐具数量</span>
        <span class='note-item-right'></span>
        <i class='iconfont icon-xiangyou'></i>

      </div>
      <div class='order-pay-note-item box-right-arrow mt-flex-space-between'>
        <span class='note-item-left'>发票</span>
        <span class='note-item-right'></span>
        <i class='iconfont icon-xiangyou'></i>

      </div>
      <div class='order-pay-note-item box-right-arrow mt-flex-space-between' @click="showPay = true">
        <span class='note-item-left'>支付方式</span>
        <span class='note-item-right'></span>
        <i class='iconfont icon-xiangyou'></i>
      </div>
    </div>

    <div class='footer-box mt-flex-space-between'>
      <div class='footer-box-left mt-flex-space-between'>
        <span class='footer-left_discount'>
          已优惠￥40.4
        </span>
        <span class='footer-left_total'>
          合计￥
          <i>115.6</i>
        </span>
      </div>
      <div class='footer-box-right'>
        <span>提交订单</span>
      </div>
    </div>

    <van-popup v-model="showPay" position="bottom" :overlay="true">
      <pop-up @cancel="cancelPay">
        <div class="pay-way-box">
          <p @click="cancelPay">在线支付</p>
          <p @click="cancelPay">货到付款</p>
        </div>
      </pop-up>
    </van-popup>
    <van-popup v-model="showRemarks" position="right" :overlay="false">
      <div class="remark-box">
        <div class="remark-box-header mt-flex-space-between">
          <i class="iconfont icon-xiangzuo" @click="showRemarks = false"></i>
          <span class="title">添加备注</span>
          <span @click="saveRemarks" class="save-btn">完成</span>
        </div>
        <textarea class="content">
        </textarea>
      </div>
    </van-popup>
  </div>
</template>

<script type="text/ecmascript-6">
import popUp from '@/views/dumb/pop-up';

export default {
  name: 'order-pay',

  data() {
    return {
      headerTitle: '提交订单',
      showPay: false,
      showRemarks: false,
    };
  },
  components: {
    popUp,
  },
  methods: {
    cancelPay() {
      this.showPay = false;
    },
    saveRemarks() {},
  },
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
@import '../../assets/style/common';

.order-pay {
  padding: 0 5px 50px;
}
.order-pay-header {
  border-radius: 5px;
  background-color: #fff;
  margin-bottom: 5px;
  margin-top: 5px;
  .header-address,
  .header-shipping-time {
    padding: 10px 30px 10px 20px;
  }
  .header-address {
    border-bottom: 1px solid #e6e5e5;
    text-align: left;
    font-size: 13px;

    .address-content {
      font-size: 20px;
      font-weight: 700;
      margin: 5px 0;
    }
  }
  .header-shipping-time {
    font-size: 15px;
    .shipping-type {
      font-weight: 700;
    }
    .shipping-time {
      color: rgb(89, 89, 216);
    }
  }
}
.order-pay-main {
  border-radius: 5px;
  background-color: #fff;
  padding: 5px 20px;
  font-size: 15px;
  .order-pay-main-item {
    border-bottom: 1px solid #e6e5e5;
    padding: 10px 0;
  }
  .main-header {
    color: #888;
    line-height: 0.5rem;
    text-align: left;
  }
  .main-food-list {
    .food-list-item {
      &:not(:last-child) {
        margin-bottom: 10px;
      }
      display: flex;
      justify-content: flex-start;
      .food-pic {
        width: 18%;
        height: 60px;
      }
      .food-info {
        margin-left: 5px;
        width: 82%;
        text-align: left;

        .food-info-main {
          line-height: 21px;
          height: 21px;
          .food-info-name {
            font-weight: 700;
            padding-right: 30px;
            display: inline-flex;
            align-items: center;
          }
          .food-info-discount {
            width: 17px;
            text-align: center;
            height: 15px;
            line-height: 15px;
            color: #fff;
            font-size: 11px;
            margin-left: 10px;
            background-color: purple;
          }
          .food-info-price {
            line-height: 21px;
            font-size: 19px;
            display: inline-flex;
            align-items: center;
            .food-info-price_original {
              text-decoration: line-through;
              font-size: 13px;
              color: #888;
              margin-right: 7px;
            }
          }
        }
        .food-info-type,
        .food-info-num {
          color: #888;
          margin: 3px 0;
          font-size: 13px;
        }
      }
    }
  }
  .food-fee {
    padding: 0.3rem 0;
    > div {
      justify-content: space-between;
      display: flex;
      padding: 5px 0;

      .food-fee-price {
        font-weight: 600;
      }
    }
  }
  .food-pay {
    text-align: right;
    font-size: 14px;
    border-top: 1px solid #e6e5e5;
    padding: 10px 0;
    .food-pay-discount {
      color: #ff0000b0;
      font-size: 16px;
      font-style: normal;
      margin-right: 8px;
    }
    .food-pay-total {
      color: red;
      font-style: normal;
      font-size: 20px;
    }
  }
}
.order-pay-note {
  border-radius: 5px;
  background-color: #fff;
  padding: 10px 0 10px 20px;
  font-size: 15px;
  margin-top: 5px;
  .order-pay-note-item {
    position: relative;
    font-size: 15px;
    padding: 10px 0;
  }
}
.footer-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1.2rem;
  .footer-box-left {
    width: 70%;
    background-color: #fff;
    padding: 0 30px;
    align-items: center;
    > span {
      line-height: 1.2rem;
    }
    .footer-left_total i {
      font-size: 20px;
      font-style: normal;
    }
  }
  .footer-box-right {
    width: 30%;
    line-height: 1.2rem;
    background-color: $mt-color;
    text-align: center;
  }
}
.box-right-arrow {
  position: relative;
  padding-right: 30px;
  .icon-xiangyou {
    position: absolute;
    top: 50%;
    font-size: 13px;
    font-weight: 700;
    transform: translateY(-50%);
    right: 10px;
    color: #d4d4d4;
  }
}
.pay-way-box {
  padding: 5px 10px;
  p {
    font-size: 15px;
    padding: 5px 0;
    &:first-child {
      border-bottom: 1px solid #b1adad4f;
    }
  }
}
.remark-box {
  text-align :center;
  .remark-box-header {
    margin-bottom: 10px;
    padding: 0 5px;
    line-height: 30px;
    .title {
      font-size: 18px;
    }
    .save-btn {
      color: $mt-color;
      font-size: 16px;
    }

  }
  .content {
    width: 90%;
    height: 80px;
    margin: 10px auto;
    background-color: #d1cece3d;
  }
}
</style>
<style>
.order-pay .van-popup--right {
  width: 100%;
  height: 100%;
}
</style>
