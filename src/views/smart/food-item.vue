<template>
  <div class="good-list-item">
    <div class="good-image" :class="{ 'good-sold-out': foodInfo.stock == 0 }">
      <img v-lazy="foodInfo.picture" />
      <div v-if="foodInfo.stock == 0" class="sold-out-slogan">已售罄</div>
      <div v-if="foodInfo.stock == 0" class="sold-out-mask"></div>
    </div>
    <div class="good-content mt-flex-space-between">
      <div class="good-content_info">
        <h4 class="good-content_info_title">{{ foodInfo.food_name }}</h4>
        <!-- <span class="good-content_info_sale"
          >月售 {{ foodInfo.month_sale }}</span
        > -->
        <!-- <span class="good-content_info_lick">赞{{ foodInfo.food_like }}</span> -->
        <div class="good-content_info_price">
          <p v-if="foodInfo.discount_info === null">￥{{ foodInfo.price }}</p>
          <div v-else class="discount-box">
            <span class="discount"
              >￥{{ foodInfo.discount_info.discount }}</span
            >
            <span class="original"
              >￥{{ foodInfo.discount_info.original }}</span
            >
          </div>
        </div>
      </div>
      <div class="good-content_buy" v-if="foodInfo.spec_arr.length">
        <button @click="getSpecInfo" class="btn-sepc">
          选规格
          <div class="food-select-num" v-if="selectNum">{{ selectNum }}</div>
        </button>
      </div>
      <div class="good-content_buy good-content_buy_nontype" v-else>
        <div class="good-content_buy_nontype_box" v-if="foodInfo.stock > 0">
          <!-- <transition name="adjust-num"> -->
          <div
            class="iconfont icon-jian"
            @click="adjustNum(-1)"
            v-show="selectNum > 0"
          ></div>
          <!-- </transition> -->
          <span v-show="selectNum > 0" class="num">{{ selectNum }}</span>
          <i class="iconfont icon-jia" @click="adjustNum(1, $event)"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "food-item",

  data() {
    return {};
  },
  props: {
    foodInfo: {
      type: Object,
      default: {}
    },
    foodIndex: {
      type: Number,
      default: -1
    },
    selectNum: {
      type: Number,
      default: 0
    }
  },
  components: {},
  methods: {
    getSpecInfo() {
      this.$emit("showSpec", this.foodIndex);
    },
    adjustNum(type, ev) {
      if (type === 1 && this.selectNum > this.foodInfo.stock) {
        return this.$toast("库存不足");
      }

      this.$emit("adjustNum", type, -1, this.foodIndex, ev);
    }
  }
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.good-list-item {
  justify-content: flex-start;
  display: flex;
  height: 2.1rem;
  margin-bottom: 0.3rem;

  .good-image {
    width: 30%;
    height: 100%;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .sold-out-slogan {
      width: 100%;
      text-align: center;
      line-height: 20px;
      height: 20px;
      position: absolute;
      bottom: 0;
      left: 50%;
      z-index: 1;
      background-color: #000;
      color: #fff;
      transform: translateX(-50%);
      opacity: 0.6;
    }
    .sold-out-mask {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      background-color: #fff;
      opacity: 0.3;
    }
  }
  .good-content {
    width: 70%;
    height: 100%;
    padding-right: 9px;
    .good-content_info {
      position: relative;
      margin-left: 10px;
      padding-left: 5px;
      text-align: left;
      .good-content_info_title {
        color: black;
        margin: 5px 0;
        font-size: 17px;
      }
      .good-content_info_sale,
      .good-content_info_lick {
        color: gray;
        font-size: 10px;
      }
      .good-content_info_price {
        position: absolute;
        bottom: 0;
        left: 5px;
        color: red;
        margin: 0;
        font-weight: 700;
        font-size: 15px;

        .discount-box {
          .original {
            text-decoration: line-through;
            font-size: 12px;
            color: $mt-gray;
            margin-left: 6px;
          }
        }
      }
    }
    .good-content_buy {
      position: relative;
      &.good-content_buy_nontype {
        .good-content_buy_nontype_box {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 100px;
          text-align: right;
          height: 21px;
        }
        .icon-jia {
          display: inline-block;
          color: $mt-color;
          font-size: 18px;
        }
        .icon-jian {
          display: inline-block;
          transform: translateX(0);
          font-size: 18px;
          color: $mt-gray;
        }
        .num {
          display: inline-block;
          width: 17px;
          font-size: 17px;
          margin: 0 5px;
          text-align: center;
        }
      }
      .btn-sepc {
        width: 65px;
        height: 22px;
        line-height: 22px;
        border: 0;
        position: absolute;
        bottom: 0;
        right: 0;
        border-radius: 15px;
        background-color: $mt-color;
        .food-select-num {
          width: 15px;
          height: 15px;
          line-height: 17px;
          color: #fff;
          position: absolute;
          right: -1px;
          top: -8px;
          border-radius: 50%;
          background-color: red;
        }
      }
    }
  }
}

@keyframes show-num {
  from {
    transform: translateX(25px) rotate(-180deg);
  }

  to {
    transform: translateX(0) rotate(0deg);
  }
}
@keyframes hide-num {
  from {
    opacity: 1;
    transform: translateX(-12px);
  }

  to {
    opacity: 0;
    transform: translateX(18px) rotate(-180deg);
  }
}

.adjust-num-enter-active,
.adjust-num-leave-active {
  transition: all 1s ease;
}

.adjust-num-enter-active {
  animation-duration: 1s;
  animation-name: show-num;
}

.adjust-num-leave-active {
  animation-duration: 1s;
  animation-name: hide-num;
}
</style>
