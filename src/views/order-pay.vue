<template>
  <div class="order-pay">
    <van-nav-bar :title="headerTitle" left-text="" left-arrow @click-left="$router.back(-1);" />
    <ul class='order-pay-header'>
      <li class='header-address'>
        <p class='address-content'>广东财经大学</p>
        <span class='address-person'>肖志豪 18024589062</span>
      </li>
      <li class='header-shipping-time'>
        <span class='shipping-type'>立即送出</span>
        <span class='shipping-time'>23:20</span>
      </li>
    </ul>
    <div class='order-pay-main'>
      <div class='main-header order-pay-main-item'>
        <span>潮爷的虾</span>
      </div>
      <ul class='main-food-list order-pay-main-item'>
        <li class='food-list-item'>
          <div class='food-pic'>
            <img>
          </div>
          <div class='food-info'>
            <div class='food-info-main'>
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
            <span class='food-info-type'>香辣</span>
            <span class='food-info-num'>x 1</span>
          </div>
        </li>
      </ul>
      <div class='food-fee'>
        <div>
          <span>包装费</span>
          <span>￥16</span>
        </div>
        <div>
          <span>配送费</span>
          <span>￥2</span>
        </div>
      </div>
      <div class='food-pay'>
        <span>已优惠
          <i>￥21.2</i>
        </span>
        <span>小计
          <i>￥64.8</i>
        </span>
      </div>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: '',

  data() {
    return {
      headerTitle: '提交订单',
    };
  },
  components: {},
  methods: {},
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.order-pay {
  padding: 5px;
  background-color: darkgrey;
}
.order-pay-header {
  border-radius: 5px;
  background-color: #fff;
  margin-bottom: 5px;
  margin-top: 5px;
  li {
    list-style-type: none;
    position: relative;
    padding: 10px 30px 10px 20px;
    font-size: 15px;
    &::after {
      content: '>';
      position: absolute;
      top: 50%;
      font-size: 20px;
      font-weight: 700;
      transform: translateY(-50%);
      right: 10px;
      color: gray;
    }
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
    display: flex;
    justify-content: space-between;
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
        .food-info-main {
          justify-content: space-between;
            display: flex;

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
            height: 15px;
            line-height: 15px;
            color: #fff;
            font-size: 11px;
            margin-left:10px;
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
      }
    }
  }
}
</style>
