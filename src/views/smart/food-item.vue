<template>
  <div class="good-list-item">
    <div class="good-image">
      <img :src="foodInfo.photo">
    </div>
    <div class="good-content mt-flex-space-between">
      <div class="good-content_info">
        <h4 class="good-content_info_title">{{foodInfo.food_title}}</h4>
        <span class="good-content_info_sale">月售 {{foodInfo.food_sales}}</span>
        <span class="good-content_info_lick">赞{{foodInfo.food_like}}</span>
        <p class="good-content_info_price">{{foodInfo.food_price}}</p>
      </div>
      <div class="good-content_buy" v-if="!!foodInfo.spec_arr">
        <van-button size="small" @click="getTypeInfo">选规格</van-button>
      </div>
      <div class="good-content_buy good-content_buy_nontype" v-else>
        <div class="good-content_buy_nontype_box">
          <i class="iconfont icon-jian" @click="selectGood(0)" v-if="selectNum > 0"></i>
          <span v-if="selectNum > 0">{{selectNum}}</span>
          <i class="iconfont icon-jia" @click="selectGood(1)"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'food-item',

  data() {
    return {};
  },
  props: {
    foodInfo: {
      type: Object,
      default: {},
    },
    foodIndex: {
      type: Number,
      default: -1,
    },
    selectNum: {
      type: Number,
      default: 0,
    },
  },
  computed: {},
  components: {},
  methods: {
    getTypeInfo() {
      this.$emit('showType', this.foodIndex);
    },
    selectGood(type) {
      this.$emit('selectGood', this.foodIndex, type);
    },
  },
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
@import '../../assets/style/common';

.good-list-item {
  justify-content: flex-start;
  display: flex;
  height: 2.1rem;
  margin-bottom: 0.3rem;

  .good-image {
    width: 30%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
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
        bottom: 5px;
        left: 5px;
        color: red;
        margin: 0;
        font-weight: 700;
        font-size: 15px;
        &::before {
          content: '￥';
          font-size: 12px;
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
        }
        .icon-jia {
          color: $mt-color;
        }
        .icon-jian {
          color: $mt-gray;
        }
        span {
          font-size: 17px;
          margin: 0 5px;
        }
      }
      .van-button {
        position: absolute;
        bottom: 0;
        right: 0;
        margin-right: 5px;
        border-radius: 15px;
        background-color: $mt-color;
      }
    }
  }
}
</style>
