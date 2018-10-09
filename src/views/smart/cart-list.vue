<template>
  <div class="cart-list">
    <div class='cart-emtpy mt-flex-space-between' v-if="foodList.length === 0">
      <div class='emtpy-left cart-list-left'>
        <span>{{freight === 0 ? '免配送费' : `另需配送费￥${freight}`}}</span>
        <!-- TODO:自取功能以后再加 -->
        <span>支持自取</span>
      </div>
      <div class='emtpy-right cart-list-right'>
        <span>{{threshold === 0 ? '无门槛':`￥${threshold} 起送`}}</span>
      </div>
    </div>
    <div class='cart-exist mt-flex-space-between' v-else @click='showMenu'>
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
      <div class='exist-right cart-list-right to-pay' @click.prevent="toSettle">
        <span>去结算</span>
        <!-- <span>差￥1.5起送</span> -->
      </div>
    </div>
    <!-- 列表 -->
    <transition name='box-up'>
      <ul class='food-list' v-show='isShow'>
        <li v-for='(foodInfo,index) in foodList' :key='index'>
          <span class='food-list_item-name'>{{foodInfo.food_title}}</span>
          <span class='food-list_item-price'>{{foodInfo.totalPrice}}</span>
          <div class='food-list_item-num'>
            <span class='num-cut-round' @click="adjustNum(0,index)">-</span>
            <span class='food-list_item-num_content'>{{foodInfo.num}}</span>
            <span class='num-add-round' @click="adjustNum(1,index)">+</span>
          </div>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import Clickoutside from '@/directive/clickoutside';
export default {
  name: '',
  directives: { Clickoutside },
  props: {
    foodList: {
      type: Array,
      default: [],
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
      isShow: false,
    };
  },
  computed: {},
  watch: {
    isExist() {
      return this.foodList.length > 0;
    },
  },
  components: {},
  methods: {
    adjustNum(type, index) {
      console.log(type, index);
      this.$emit('adjustNum', type, index);
    },
    showMenu() {
      this.isShow = !this.isShow;
    },
    getBox() {
      console.log('1');
      this.isShow = false;
    },
    toSettle(event) {
      this.$emit('toSettle');
      event.stopPropagation();
    },
  },
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
@import '../../assets/style/common';

.cart-list {
  position: fixed;
  bottom: 0px;
  padding-bottom: 10px;
  width: 100%;
  z-index: $zindex-navbar;
  color: #d1cccc;
  .cart-emtpy,
  .cart-exist {
    width: 90%;
    height: 1.3rem;
    line-height: 1.3rem;
    background-color: #464444;
    font-size: 15px;
    border-radius: 30px;
    padding-left: 60px;
    box-sizing: border-box;
    margin: 0 auto;
    position: relative;
    z-index: $zindex-navbar-main;
    box-shadow: 0px 30px 10px 5px #7c7a7a40;
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
        text-decoration: line-through;
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
    border-radius: 0 30px 30px 0;
    position: relative;
    right: -1px;
    padding: 0 0.6rem;
  }

  .food-list {
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    padding-bottom: 1.5rem;
    z-index: $zindex-navbar-menu;
    li {
      list-style-type: none;
      width: 100%;
      line-height: 1.3rem;
      border-bottom: 1px solid #e6e5e5;
      display: flex;
      justify-content: space-between;
      font-size: 18px;
      padding: 5px 10px;
      box-sizing: border-box;
      .food-list_item-name {
        display: -webkit-box;
        width: 35%;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
      .food-list_item-num {
        .num-add-round,
        .num-cut-round {
          border-radius: 50%;
          border: 1px solid #e6e5e5;
          width: 20px;
          line-height: 20px;
          display: inline-block;
        }
        .num-add-round {
          background-color: $mt-color;
        }
      }
    }
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fadeOutDown {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }
}

.box-up-enter-active,
.box-up-leave-active {
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

.box-up-enter-active {
  -webkit-animation-duration: 0.5s;
  animation-duration: 0.5s;
  -webkit-animation-name: fadeInUp;
  animation-name: fadeInUp;
}

.box-up-leave-active {
  -webkit-animation-duration: 0.5s;
  animation-duration: 0.5s;
  -webkit-animation-name: fadeOutDown;
  animation-name: fadeOutDown;
}
</style>
