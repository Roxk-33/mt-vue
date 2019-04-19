<template>
  <transition name="box-scale">
    <div class="specification-box-container" v-show="value">
      <div class="specification-box">
        <div class="specification-box_header">
          <span class="specification-box_title">{{ foodInfo.food_name }}</span>
          <i class="specification-box_close iconfont icon-close" @click="value = false"/>
        </div>
        <div class="specification-box_content">
          <div class="box-item" v-for="(typeItem, index) in totalSpec" :key="typeItem.value">
            <p class="box-item_title">{{ typeItem.spec_name }}</p>
            <ul class="box-item-specification">
              <li
                @click="chooseType(item, index, type_index)"
                v-for="(item, type_index) in typeItem.spec_arr"
                :key="type_index"
                :class="{
                  'box-item_selected': specArr[index] == item.id,
                  'slod-out': item.stock == 0
                }"
              >{{ item.label }}</li>
            </ul>
          </div>
        </div>
        <div class="specification-box_footer mt-flex-space-between">
          <div class="footer-info">
            <span class="footer-info_price">￥{{ totalPrice }}</span>
            <span class="footer-info_specification">({{ slogan }})</span>
          </div>
          <van-button size="small" @click="pushCart($event)" v-if="isExist == -1 || num == 0">
            <i class="iconfont icon-jia1"/>加入购物车
          </van-button>
          <div class="specification-box-num-btn" v-else>
            <i class="iconfont icon-jianshao" @click="adjustNum(-1)"></i>
            <span class="food-num">{{ num }}</span>
            <i class="iconfont icon-add_icon" @click="adjustNum(1, $event)"></i>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import Popup from "@/mixins/popup";
import { deepClone } from "@/common/utils";
import foodIsRepeat from "@/mixins/food-is-repeat";

export default {
  name: "SpecificationBox",
  mixins: [Popup, foodIsRepeat],
  data() {
    return {
      totalSpec: [],
      totalPrice: 0,
      specInfo: {},
      isExist: -1,
      specArr: [],
      specText: [],
      num: 0
    };
  },
  props: {
    // 购物车中的商品
    cartList: {
      type: Array,
      default: []
    },

    foodInfo: {
      type: Object
    }
  },
  methods: {
    /**
     * @param specInfo 所选规格信息
     * @param index 所选规格种类下标
     * @param typeIndex 所选规格数值下标
     */
    chooseType(specInfo, index, typeIndex) {
      // 库存不足
      if (specInfo.stock === 0) return;
      this.specInfo = specInfo;
      // 前一个规格的价钱
      const price = this.totalSpec[index].spec_arr.find(
        item => item.id == this.specArr[index]
      ).price;
      this.specArr.splice(index, 1, specInfo.id);
      this.specText.splice(index, 1, specInfo.label);
      this.isExist = this.isRepeat(this.cartList, {
        id: this.foodId,
        specArr: this.specArr
      });
      if (this.isExist === -1) {
        this.num = 0;
        this.totalPrice += parseFloat(specInfo.price) - price;
      } else {
        const item = this.cartList[this.isExist];
        this.specArr = deepClone(item.spec_arr);
        this.specText = deepClone(item.spec_text);
        this.totalPrice = item.price;
        this.num = item.num;
      }
    },
    isExistCart() {
      this.isExist = this.isRepeat(this.cartList, {
        id: this.foodId,
        specArr: this.specArr
      });

      if (this.isExist !== -1) {
        const item = this.cartList[this.isExist];
        this.specArr = deepClone(item.spec_arr);
        this.specText = deepClone(item.spec_text);
        this.totalPrice = item.price;
        this.num = item.num;
        return true;
      }
      return false;
    },
    // 初始化
    init() {
      this.totalSpec = [];
      this.formatSpec(this.foodInfo.spec_arr);
      if (!this.isExistCart()) {
        console.log("购物车中未有该商品");
        // 购物车中未有该商品
        // 计算默认规格的价钱
        this.totalPrice = this.foodInfo.price;
        this.totalSpec.forEach(item => {
          const content = item.spec_arr[item.spec_default];
          this.totalPrice += parseFloat(content.price);
        });
      }
    },
    // 将后端传来的规格数据格式转换成前端展示需要的格式
    formatSpec(data) {
      const temp = {};
      this.specArr.splice(0, this.specArr.length);
      this.specText.splice(0, this.specText.length);
      data.forEach((item, index) => {
        const _type = item.spec_type;
        if (!temp[_type]) {
          temp[_type] = {};
          temp[_type] = {
            spec_name: item.spec_name,
            spec_arr: [],
            spec_default: 0
          };
        }

        temp[_type].spec_arr.push({
          price: item.price,
          stock: item.stock,
          label: item.label,
          id: item.id
        });
        if (item.is_default) {
          temp[_type].spec_default = temp[_type].spec_arr.length - 1;
          this.specInfo = temp[_type].spec_arr[temp[_type].spec_default];
          this.specArr.push(item.id);
          this.specText.push(item.label);
        }
      });
      Object.keys(temp).forEach(key => this.totalSpec.push(temp[key]));
    },

    pushCart(ev) {
      this.num++;
      this.$emit(
        "pushSpecToCart",
        this.isExist,
        this.specArr,
        this.specText,
        this.totalPrice,
        1,
        ev
      );
    },
    adjustNum(type, ev) {
      console.log(ev);
      if (type === 1) {
        if (this.specInfo.stock < this.num) return this.$toast("库存不足");
        console.log("增加");
        this.num++;
        this.$emit(
          "pushSpecToCart",
          this.isExist,
          this.specArr,
          this.specText,
          this.totalPrice,
          type,
          ev
        );
      } else if (this.num > 0) {
        this.num--;
        this.$emit(
          "pushSpecToCart",
          this.isExist,
          this.specArr,
          this.specText,
          type
        );
      }
    }
  },

  watch: {
    value(val) {
      if (val) {
        this.init();
      }
    },
    cartList() {
      this.value && this.isExistCart();
    }
  },
  computed: {
    foodId() {
      return this.foodInfo.id;
    },
    slogan() {
      return this.specText.join(",");
    }
  }
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
// 弹窗

.specification-box-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 101;
  width: 100%;
  transform: translate3d(-50%, -50%, 0);
  top: 50%;
  left: 50%;
  width: 85%;
  z-index: $zindex-mask-box;
}
.specification-box {
  position: relative;
  border-right: 5px;
  background-color: white;
  z-index: 101;
  border-radius: 5px;
  // @include scroll-style;
  font-size: 12px;
  overflow: hidden;
  .specification-box_header {
    text-align: left;
    position: relative;
    padding: 10px 5px;
    text-align: center;

    .specification-box_title {
      line-height: 18px;
      font-size: 18px;
      color: #303133;
    }
    .specification-box_close {
      position: absolute;
      right: 10px;
      line-height: 18px;
      font-size: 15px;
      top: 50%;
      transform: translateY(-60%);
    }
  }
  .specification-box_content {
    box-sizing: border-box;
    overflow-y: scroll;
    overflow-x: hidden;
    position: relative;
    max-height: 7rem;
  }
  .specification-box_footer {
    height: 1.6rem;
    width: 100%;
    line-height: 0.6rem;
    box-sizing: border-box;
    padding: 10px 5px;
    background-color: #efefef;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    .specification-box-num-btn {
      .iconfont {
        font-size: 0.6rem;
      }
      .food-num {
        font-size: 0.6rem;
        margin: 0 8px;
      }
    }
  }
}
.box-item {
  margin-bottom: 10px;
  padding: 0 5px;
  .box-item_title {
    text-align: left;
    margin: 5px;
  }
  .box-item-specification {
    display: flex;
    justify-content: flex-start;
    li {
      list-style-type: none;
      text-align: center;
      width: 60px;
      height: 25px;
      line-height: 25px;
      margin: 5px;
      border: 1px solid rgb(179, 178, 178);
      &.box-item_selected {
        color: $mt-color;
        border-color: $mt-color;
      }
      &.slod-out {
        color: lightgray;
        border-color: lightgray;
      }
    }
  }
}
.specification-box_footer {
  .footer-info {
    display: flex;
    justify-content: space-around;
    text-align: left;
  }
  .footer-info_price {
    font-size: 20px;
    color: #db1a1ad4;
    margin-right: 5px;
    vertical-align: middle;
  }
  .van-button {
    background-color: #f3af0a;
    border-color: #f3af0a;
    color: #000;
    border-radius: 12px;
    font-weight: 700px;
    min-width: 100px;
    i {
      margin: 0 5px;
      &.icon-jia1 {
        font-size: 12px;
        margin-right: 3px;
      }
    }
  }
}
</style>
