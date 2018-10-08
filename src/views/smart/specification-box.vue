<template>
  <div>
    <div class='specification-box-mask' v-show="visible" @touchmove.prevent.stop></div>
    <transition name='box-scale'>
      <div class="specification-box-container" v-show="visible">
        <div class='specification-box' v-click-outside="closeEvent">
          <div class='specification-box_header'>
            <span class='specification-box_title'>{{title}}</span>
            <i class='specification-box_close fa fa-close' @click="closeEvent"></i>
          </div>
          <div class='specification-box_content'>
            <div class='box-item' v-for="(typeItem,index) in foodInfo.type" :key="typeItem.value">
              <p class='box-item_title'>{{typeItem.type_name}}</p>
              <ul class='box-item-specification'>
                <li @click="chooseType(index,type_index,item)" v-for="(item,type_index) in typeItem.type_content" :key="item.type_name" :class="{'box-item_selected' : selectedInfo.typeSelected[index].label === item.label}">
                  {{item.label}}
                </li>
              </ul>
            </div>
          </div>
          <div class='specification-box_footer mt-flex-space-between'>
            <div class='footer-info'>
              <span class='footer-info_price'>￥{{selectedInfo.totalPrice}}</span>
              <span class='footer-info_specification'>({{selectedInfo.typeInfo}})</span>
            </div>
            <van-button size="small" @click="pushCart">
              <i class='fa fa-plus'></i>加入购物车
            </van-button>
          </div>
        </div>
      </div>

    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import Clickoutside from '@/directive/clickoutside';

export default {
  name: 'specification-box',

  data() {
    return {
      closed: false,
      selectedInfo: {
        typeSelected: [],
        totalPrice: 0,
        typeInfo: '',
      },
    };
  },
  directives: { Clickoutside },

  props: {
    title: {
      type: String,
      default: '标题',
    },
    visible: {
      type: Boolean,
      default: true,
    },
    foodInfo: {
      type: Object,
    },
  },
  computed: {},
  mounted() {},
  methods: {
    closeEvent() {
      if (this.visible) {
        this.$emit('update:visible', false);
        this.closed = false;
      }
    },
    refreshTypeInfo() {
      this.selectedInfo.typeInfo = '';
      this.selectedInfo.typeSelected.forEach(typeInfo => {
        this.selectedInfo.typeInfo += `${typeInfo.label},`;
      });
      // 去掉最后的逗号
      this.selectedInfo.typeInfo = this.selectedInfo.typeInfo.slice(0, this.selectedInfo.typeInfo.length - 1);
    },
    chooseType(index, typeIndex, typeInfo) {
      this.selectedInfo.totalPrice += parseFloat(typeInfo.price) - this.selectedInfo.typeSelected[index].price;
      this.selectedInfo.typeSelected[index] = typeInfo;
      this.refreshTypeInfo();
    },
    getInfo() {
      this.selectedInfo.id = this.foodInfo.food_id;
      this.selectedInfo.food_title = this.foodInfo.food_title;
      this.selectedInfo.typeSelected = [];
      this.selectedInfo.totalPrice = 0;

      this.selectedInfo.totalPrice = this.foodInfo.food_price;
      this.selectedInfo.typeInfo = '';
      this.foodInfo.type.forEach(item => {
        const content = item.type_content[item.type_default];
        this.selectedInfo.typeSelected.push(content);
        this.selectedInfo.totalPrice += parseFloat(content.price);
      });
      this.refreshTypeInfo();
    },
    pushCart() {
      console.log(this.selectedInfo);

      this.$emit('pushCart', this.selectedInfo);
      this.closeEvent();
      this.closed = false;
    },
  },

  watch: {
    visible(val) {
      if (val) {
        this.getInfo();
        document.body.style.overflow = 'hidden';
      } else {
        document.documentElement.style.overflow = 'visible';
      }
    },
  },
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
  }
}
.specification-box-mask {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;
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
