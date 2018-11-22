<template>
  <div class="container">
    <div class='filter-box mt-flex-space-between'>
      <div class="filter-box-content" v-click-outside="closeEvent">
        <span class='sort-target' @click="showBox" :class="{ 'sort-target_bold' : (sortTarget !== 'sale' && sortTarget !== 'distance')}">

          {{ fliterList[sortTarget] }}
          <i :class="{'fa fa-angle-down' : !show,'fa fa-angle-up' : show}" />
        </span>
        <!-- <span class='sort-target sort-target_small' @click="selectSortType('sale')" :class="{ 'sort-target_bold' : sortTarget === 'sale' }">销量</span> -->
        <!-- <span class='sort-target sort-target_small' @click="selectSortType('distance')" :class="{ 'sort-target_bold' : sortTarget === 'distance' }">距离</span> -->

      </div>
      <div class="filter-box-content filter-box-content_right">
        筛选
        <i class='fa fa-bars' style="margin-left:5px;" />
      </div>
    </div>
    <div class='sort-box' :class="show?'show-box':''">
      <p @click="selectSortType(index)" :class="{ 'sort-target_selected' : sortTarget === index }" v-for="(item,index) in fliterList" :key="index">{{ item }}</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import CONSTANT from '@/common/constant';

export default {
  name: 'ShopListHeader',

  data() {
    return {
      show: false,
      fliterList: CONSTANT.fliterList,
    };
  },
  components: {},
  props: {
    sortTarget: {
      type: String,
      default: '',
    },
  },
  methods: {
    showBox() {
      this.show = true;
      // 点击排序框时，显示店铺列表遮罩层
      this.$emit('showMask', true);
    },
    selectSortType(type) {
      if (!(type === 'sale' || type === 'distance')) {
        this.show = !this.show;
      } else {
        this.show = false;
      }
      this.$emit('change', type);
      this.show = false;
      this.$emit('showMask', false);
    },
    closeEvent() {
      this.$emit('showMask', false);
      this.show = false;
    },
  },
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.container {
  overflow: hidden;
}
.filter-box {
  background-color: white;
  height: 40px;
  padding: 2px 10px;
  box-sizing: border-box;
  position: relative;
  align-items: center;
  z-index: 2101;
  .filter-box-content {
    text-align: left;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    font-size: 13px;
    color: rgb(165, 164, 164);
  }
  .sort-target {
    margin-right: 5px;
    &:first-child {
      width: 80px;
      display: inline-block;
      color: black;
    }
    &.sort-target_bold {
      font-weight: 600;
      color: black;
    }
  }
}
.sort-box {
  transition: max-height 0.5s;
  &.show-box {
    max-height: 300px;
  }
  overflow: hidden;

  position: absolute;
  width: 100%;
  text-align: left;
  padding-left: 20px;
  font-size: 13px;
  left: -2px;
  top: 51px;
  z-index: 2001;
  margin-top: 32px;
  background-color: white;
  color: black;
  max-height: 0;
  p {
    margin: 5px 0;
  }
  .sort-target_selected {
    color: #ffd161;
    font-weight: 700;
  }
}
</style>
