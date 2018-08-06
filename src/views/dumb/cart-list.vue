<template>
  <div class="cart-list">
    <div class='cart-emtpy' v-if="!isExist">
      <div class='emtpy-left cart-list-left'>
        <span>{{freight === 0 ? '免配送费' : `另需配送费￥${freight}`}}</span>
        <!-- TODO:自取功能以后再加 -->
        <span>支持自取</span>
      </div>
      <div class='emtpy-right cart-list-right'>
        <span>{{threshold === 0 ? '无门槛':`￥${threshold} 起送`}}</span>
      </div>
    </div>
    <div class='cart-exist' v-else>
      <div class='exist-left cart-list-left'>
        <div class='exist-left-price'>
          <span class='exist-left-price_actual'>￥{{totalPrice}}</span>
          <span class='exist-left-price_original'>￥35.4</span>
        </div>
        <div class='exist-left-info'>
          <span>另需配送费￥3</span>
          <span>支持自取</span>
        </div>
      </div>
      <div class='exist-right cart-list-right to-pay'>
        <span>去结算</span>
        <!-- <span>差￥1.5起送</span> -->
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: '',
  props: {
    foodList: {
      type: Array,
    },
    // 门槛
    threshold: {
      type: Number,
      default: 1,
    },
    // 运费
    freight: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      isExist: false,
    };
  },
  computed: {},
  watch: {},
  components: {},
  methods: {},
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
@import '../../assets/style/common';

.cart-list {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 1.3rem;
  line-height: 1.3rem;
  background-color: #464444;
  font-size: 15px;

  z-index: $zindex-navbar;
  color: #d1cccc;
  .cart-emtpy,
  .cart-exist {
    display: flex;
    justify-content: space-between;
    padding-left: 60px;
  }

  .emtpy-right {
    font-size: 18px;
  }

  .emtpy-left {
    span:first-child::after {
      @include SeparationLine;
    }
  }
  .exist-left {
    line-height: 0.6rem;
    padding: 3px 0;
    box-sizing: border-box;
    .exist-left-price {
      text-align: left;
      .exist-left-price_actual {
        font-size: 20px;
        margin-right: 5px;
      }
      .exist-left-price_original {
      }
    }
    .exist-left-info {
      font-size: 12px;
    }
  }
  .cart-list-right {
    &.to-pay {
      background-color: $mt-color;
    }
    padding: 0 0.6rem;
  }
}
</style>
