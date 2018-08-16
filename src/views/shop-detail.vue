
<template>
  <div class="shopDetail">
    <div class="shop-config" ref="shopConfig">
      <div class="config-wrapper" :style="{opacity:trackOpacity}"></div>
      <router-link to="/shop/list">
        <i class="iconfont icon-xiangzuo"></i>
      </router-link>
      <div class="shop-config_right" :class="{'shop-config_right_white' :isTop}">
        <i class="iconfont icon-sousuo"></i>
        <i class="iconfont icon-shoucang"></i>
        <i class="iconfont icon-pin"></i>
        <i class="iconfont icon-gengduo"></i>
      </div>
    </div>

    <div class="shop-banner" ref="shopBanner">
      <div class="banner-baseInfo">
        <div class="banner-shopAvatar">
          <img src="../assets/images/avatar.jpg">
        </div>
        <div class="banner-shopInfo">
          <h4>标题</h4>
          <label>公告</label>
        </div>
      </div>
      <div class="banner-offerInfo">
        活动信息
      </div>
    </div>

    <div class="shop-good" ref="shopGood" :style="shopGoodStyle">
      <div class="shop-good-tab" ref="shopTab">
        <van-tabs v-model="tabActive">
          <van-tab v-for="(tab,index) in tabs" :title="tab.label" :key="index"></van-tab>
        </van-tabs>
      </div>
      <div class="shop-good-content">
        <div class="shop-good-menu" ref="goodMenu">
          <better-scroll ref="scroll" :data="Types" @pullingDown="onPullingDown" @pullingUp="onPullingUp">
            <div class="menu-item" v-for="catalog in shopInfo.shop_catalog" :key="catalog.value">{{catalog.title}}</div>
          </better-scroll>
        </div>

        <div class="shop-good-list" :style="{marginLeft : trackMarginLeft + 'px'}">
          <better-scroll ref="scroll" :data="Types" @pullingDown="onPullingDown" @pullingUp="onPullingUp" :listenScroll="true" :probeType="probeType" @scroll="onScroll">
            <foodItem v-for="(foodInfo,index) in foodList" :key="foodInfo.food_id" :foodInfo="foodInfo" :foodIndex="index" :selectNum="foodInfo.selectNum" @showType="getTypeInfo" @selectGood="selectGood"/>
          </better-scroll>
        </div>
      </div>
    </div>
    <cart-list :total-price="cartInfo.totalPrice" :foodList="cartInfo.list" @adjustNum="adjustNum" @toSettle="toSettle"></cart-list>

    <specificationBox @pushCart="getSelectGoood" :visible.sync="showSpBox" :center="true" width="90%" :foodInfo="foodSelected">
    </specificationBox>

  </div>
</template>

<script>
import { getRect } from '@/common/dom';
import { fetchShopDetail } from '@/api/shop';
import BetterScroll from './dumb/scroll/other';
import specificationBox from '@/views/smart/specification-box';
import cartList from '@/views/smart/cart-list';
import foodItem from '@/views/smart/food-item';

export default {
  name: 'shopDetail',

  data() {
    return {
      tabs: [
        {
          label: '点菜',
          value: 'menu',
        },
        {
          label: '评价',
          value: 'evaluation',
        },
        {
          label: '商家',
          value: 'business',
        },
      ],
      Types: ['韩式辣味系列'],
      tabActive: 0,
      probeType: 3,
      bannerHeight: 0,
      isTop: false,
      showSpBox: false,
      shopInfo: {},
      foodList: [],
      totalPrice: 0,
      cartInfo: {
        list: [],
        totalPrice: 0,
      },
      foodSelected: {},
      trackSize: 0, // 商品列表高度
      trackTop: 0, // 商品列表Top
      trackOpacity: 0, // 顶部状态栏opacity
      trackMarginLeft: 0, // 顶部状态栏opacity
    };
  },
  components: {
    BetterScroll,
    specificationBox,
    cartList,
    foodItem,
  },
  methods: {
    onPullingUp() {},
    onPullingDown() {},
    initMenu() {
      this.bannerHeight = getRect(this.$refs.shopBanner).height - Math.floor(getRect(this.$refs.shopConfig).height);
      this.trackSize =
        window.innerHeight - getRect(this.$refs.shopTab).height - getRect(this.$refs.shopConfig).height + 1;
      this.trackMarginLeft = getRect(this.$refs.goodMenu).width + 10;
    },
    onScroll(op) {
      const scorllY = Math.abs(op.y) * 0.5;
      if (op.y <= -10) {
        this.trackOpacity = 0;
      }

      if (this.bannerHeight > scorllY && op.y < 0) {
        this.trackTop = -scorllY;
        this.trackOpacity = scorllY / this.bannerHeight;
        this.isTop = false;
      }
      if (this.bannerHeight <= scorllY) {
        this.trackTop = -this.bannerHeight;
        this.trackOpacity = '1';
        this.isTop = true;
      }
    },

    getSelectGoood(foodInfo) {
      this.cartInfo.totalPrice += foodInfo.totalPrice;
      this.totalPrice = this.cartInfo.totalPrice;
      console.log(foodInfo);
      // TODO:检测是否有相同规格的商品,两数组之间的对比。当前实现方法并不理想
      if (this.cartInfo.list.length > 0) {
        this.cartInfo.list.some(_foodInfo => {
          if (_foodInfo.id === foodInfo.id) {
            let _typeSelected = _foodInfo.typeSelected;
            const typeSelected = foodInfo.typeSelected;
            typeSelected.forEach(ele => {
              _typeSelected = _typeSelected.filter(_ele => {
                return ele.label !== _ele.label || ele.price !== _ele.price;
              });
            });
            if (_typeSelected.length === 0) {
              _foodInfo.num++;
            } else {
              foodInfo.num = 1;
              // 深拷贝
              this.cartInfo.list.push(JSON.parse(JSON.stringify(foodInfo)));
            }
            return true;
          }
        });
      } else {
        foodInfo.num = 1;
        this.cartInfo.list.push(JSON.parse(JSON.stringify(foodInfo)));
      }
      console.log(this.cartInfo);
    },
    /**
     * @description 删除/增加 已选商品
     * @augments type:0为删除1个，1为增加1个；index:下标
     */
    adjustNum(type, index) {
      let foodInfo = this.cartInfo.list[index];
      if (type === 1) {
        foodInfo.num++;
        this.cartInfo.totalPrice += foodInfo.totalPrice;
      } else {
        if (foodInfo.num === 1) {
          this.cartInfo.list.splice(index, 1);
        } else {
          foodInfo.num--;
        }
        this.cartInfo.totalPrice -= foodInfo.totalPrice;
      }
    },
    // 去结算
    toSettle() {
      this.$router.push('/order/pay');
    },
    getTypeInfo(index) {
      this.foodSelected = this.foodList[index];
      this.showSpBox = true;
    },
    selectGood(index, type) {
      let foodInfo = this.foodList[index];
      if (type) {
        this.foodList[index].selectNum++;
        this.cartInfo.totalPrice += foodInfo.food_price;
      } else if (this.foodList[index].selectNum > 0) {
        this.foodList[index].selectNum--;
        this.cartInfo.totalPrice -= foodInfo.food_price;
      }
      this.foodList[index].totalPrice = foodInfo.food_price * this.foodList[index].selectNum;

      if (this.foodList[index].selectNum == 1) {
        this.cartInfo.list.push(this.foodList[index]);
      }
    },
  },
  created() {
    const shopId = this.$route.params.shop_id;

    fetchShopDetail({ shop_id: shopId }).then(resp => {
      this.shopInfo = resp.data.info;
      resp.data.food_list.forEach(item => {
        item.selectNum = 0;
      });
      this.foodList = resp.data.food_list;
    });
  },
  mounted() {
    setTimeout(() => {
      this.initMenu();
    }, 20);
  },
  computed: {
    // totalPrice() {

    // },
    shopGoodStyle() {
      return {
        height: `${this.trackSize}px`,
        top: `${this.trackTop}px`,
      };
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import '../assets/style/common';

.shop-config {
  height: 0.6rem;
  display: flex;
  justify-content: space-between;
  line-height: 0.5rem;
  padding: 0.1rem;
  box-sizing: border-box;
  width: 100%;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  transition: all 0.5s;

  .config-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: inherit;
    background: white;
    opacity: 0;
    z-index: -1;
  }
  a {
    margin-top: -0.1rem;
  }
  .shop-config_right {
    color: white;

    i {
      font-size: 15px;
      margin: 0 5px;
      transition: all 0.5s;
    }
    &.shop-config_right_white i {
      color: $mt-color;
    }
  }
}

.shop-banner {
  .banner-baseInfo {
    padding-top: 2rem;
    height: 4rem;
    box-sizing: border-box;
    background: url('../assets/images/banner.jpg') no-repeat;
    background-size: 100% 100%;
    text-align: left;
    padding-left: 1rem;
    display: flex;
    justify-content: flex-start;
    .banner-shopAvatar {
      width: 3rem;
      height: 2.5rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }
    }
    .banner-shopInfo {
      h4 {
        margin: 5px 0 0 10px;
        font-size: 22px;
      }
      label {
        font-size: 10px;
        margin-left: 10px;
      }
    }
  }
  .banner-offerInfo {
    background-color: white;
    height: 1rem;
    padding: 0.8rem 1rem 0 1rem;
    font-size: 15px;
    text-align: left;
  }
}

.shop-good {
  background-color: white;
  position: relative;
  .shop-good-tab {
    width: 100%;
    background-color: white;
    display: block;
    margin-bottom: 5px;
    .van-tabs__wrap::after {
      border-top: 0;
    }
    .van-tabs__line {
      margin-left: 50px;
      width: 25px !important;
    }
  }
  .shop-good-content {
    justify-content: flex-start;
    display: flex;
    position: relative;
    height: inherit;
    background-color: white;
  }
  .shop-good-menu {
    width: 20%;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
    overflow: hidden;
    .menu-item {
      width: 100%;
      padding: 8px 5px 8px 8px;
      font-size: 15px;
      text-align: left;
      box-sizing: border-box;
    }
  }
  .shop-good-list {
    width: 100%;
    overflow: hidden;
  }
}
</style>
