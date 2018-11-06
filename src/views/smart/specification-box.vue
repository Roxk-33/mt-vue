<template>
  <transition name='box-scale'>
    <div class="specification-box-container" v-show="value">
      <div class='specification-box'>
        <div class='specification-box_header'>
          <span class='specification-box_title'>{{title}}</span>
          <i class='specification-box_close fa fa-close'></i>
        </div>
        <div class='specification-box_content'>
          <div class='box-item' v-for="(typeItem,index) in foodInfo.spec_arr" :key="typeItem.value">
            <p class='box-item_title'>{{typeItem.type_name}}</p>
            <ul class='box-item-specification'>
              <li @click="chooseType(item,index,type_index)" v-for="(item,type_index) in typeItem.type_content" :key="item.type_name" :class="{'box-item_selected' : selectedInfo.specArr[index].label === item.label}">
                {{item.label}}
              </li>
            </ul>
          </div>
        </div>
        <div class='specification-box_footer mt-flex-space-between'>
          <div class='footer-info'>
            <span class='footer-info_price'>￥{{selectedInfo.totalPrice}}</span>
            <span class='footer-info_specification'>({{slogan}})</span>
          </div>
          <van-button size="small" @click="pushCart" v-if="isExist == -1">
            <i class='fa fa-plus'></i>加入购物车
          </van-button>

          <div class='specification-box-num-btn' v-else>
            <span class='num-cut-round' @click="adjustNum(0)">-</span>
            <span class='food-num'>{{selectedInfo.num}}</span>
            <span class='num-add-round' @click="adjustNum(1)">+</span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import Popup from '@/mixins/popup';
import { deepClone } from '@/common/utils';
import foodIsRepeat from '@/mixins/food-is-repeat';

export default {
  name: 'specification-box',
  mixins: [Popup, foodIsRepeat],
  data() {
    return {
      closed: false,
      selectedInfo: {
        specArr: [],
        totalPrice: 0,
        num: 0,
        title: '',
        id: -1,
      },
      slogan: '',
      isExist: -1,
    };
  },
  props: {
    // 购物车中的商品
    cartList: {
      type: Array,
      default: [],
    },
    title: {
      type: String,
      default: '标题',
    },
    foodInfo: {
      type: Object,
    },
  },
  methods: {
    // 更新规格文案
    refreshTypeInfo() {
      this.slogan = '';
      this.selectedInfo.specArr.forEach(specInfo => {
        this.slogan += `${specInfo.label},`;
      });
      // 去掉最后的逗号
      this.slogan = this.slogan.slice(0, -1);
    },
    /**
     * @param specInfo 所选规格信息
     * @param index 所选规格种类下标
     * @param typeIndex 所选规格数值下标
     */
    chooseType(specInfo, index, typeIndex) {
      // 前一个规格的价钱
      let price = this.selectedInfo.specArr[index].price;
      this.selectedInfo.specArr[index] = specInfo;
      this.isExist = this.isRepeat(this.cartList, this.selectedInfo);

      if (this.isExist === -1) {
        this.selectedInfo.num = 0;
        this.selectedInfo.totalPrice += parseFloat(specInfo.price) - price;
      } else {
        this.copyData(this.cartList[this.isExist]);
      }
      this.refreshTypeInfo();
    },
    // 初始化
    init() {
      // TODO:检测是否有相同规格的商品,两数组之间的对比。当前实现方法并不理想
      this.isExist = this.isRepeat(this.cartList, this.selectedInfo);
      if (this.isExist === -1) {
        this.copyData(this.foodInfo);
        // 计算默认规格的价钱
        this.foodInfo.spec_arr.forEach(item => {
          const content = item.type_content[item.type_default];
          this.selectedInfo.specArr.push(content);
          this.selectedInfo.totalPrice += parseFloat(content.price);
        });
      } else {
        this.copyData(this.cartList[this.isExist]);
      }
      this.slogan = '';
      this.refreshTypeInfo();
    },
    // 复制数据
    copyData(data) {
      let target = deepClone(data);
      this.selectedInfo.id = target.id;
      this.selectedInfo.title = target.title;
      this.selectedInfo.num = target.num || 0;
      this.selectedInfo.specArr = target.specArr || [];
      this.selectedInfo.totalPrice = target.totalPrice || target.price;
    },
    pushCart() {
      this.selectedInfo.num++;
      this.$emit('pushCart', this.isExist, this.selectedInfo, 1);
      this.isExist = this.isRepeat(this.cartList, this.selectedInfo);
    },
    adjustNum(type) {
      if (type === 1) {
        this.selectedInfo.num++;
        this.$emit('pushCart', this.isExist, this.selectedInfo, type);
      } else if (this.selectedInfo.num > 0) {
        this.selectedInfo.num--;
        this.$emit('pushCart', this.isExist, this.selectedInfo, type);
      }
    },
  },

  watch: {
    value(val) {
      if (val) {
        this.init();
      }
    },
  },
  computed: {},
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
@import '../../assets/style/common';
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
  @include scroll-style;
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
      font-size: 18px;
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
    height: 1.2rem;
    width: 100%;
    line-height: 0.6rem;
    box-sizing: border-box;
    padding: 10px 5px;
    background-color: #fdf6f6;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    .specification-box-num-btn {
      .num-add-round,
      .num-cut-round {
        border-radius: 50%;
        border: 1px solid #e6e5e5;
        width: 20px;
        line-height: 20px;
        display: inline-block;
        text-align: center;
      }
      .num-add-round {
        background-color: $mt-color;
      }
      .food-num {
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
    background-color: $mt-color;
    border-radius: 12px;
    font-weight: 700px;
    min-width: 100px;
    i {
      margin: 0 5px;
    }
  }
}
</style>
