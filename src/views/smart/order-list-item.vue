<template>
  <div class="order-list-item">
    <div class="item-header mt-flex-space-between">
      <div class="item-header-left">
        <img src="https://via.placeholder.com/80x80" alt="">
        <div class="item-header-shop-info">
          <span class="shop-info-name">李功夫中华鸡排</span>
          <i class='iconfont icon-xiangyou'></i>
        </div>
      </div>
      <div class="item-header-right">
        <p>订单已完成</p>
      </div>
    </div>
    <div class="item-content">
      <div class="item-content-info">
        <span class="info-name">原香鸡排</span>
        <span class="info-num">等<i>2</i>件商品</span>
        <p class="order-price">￥15</p>
      </div>
      <div class="item-content-btn-box">
        <span class="item-content-btn">再来一单</span>
        <span class="item-content-btn">再来一单</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'order-list-item',

  data() {
    return {};
  },
  components: {},
  methods: {},
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
        .shop-info-name {
          color: #000;
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
        color: #000;
        font-weight: 600;
        font-size: 15px;
      }
    }
    .item-content-btn-box {
      text-align: right;
      margin-top: 20px;
      .item-content-btn {
        padding: 5px;
        border: 1px solid #cccccc;
        color: #000;
      }
    }
  }
}
</style>
