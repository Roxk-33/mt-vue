
<template>
  <div class="shop-detail">
    <shop-nav :trackOpacity="trackOpacity" :isTop="isTop"></shop-nav>
    <div ref="shopBanner">
      <shop-header></shop-header>
    </div>
    <div class="shop-good" ref="shopGood" :style="shopGoodStyle">
      <div class="shop-good-tab">
        <van-tabs v-model="tabActive">
          <van-tab v-for="(tab,index) in tabs" :title="tab.label" :key="index"></van-tab>
        </van-tabs>
      </div>
      <div class="shop-good-content">
        <div class="shop-good-menu">
          <better-scroll>
            <div class="menu-item" v-for="catalog in shopInfo.shop_catalog" :key="catalog.value">{{catalog.title}}</div>
          </better-scroll>
        </div>

        <div class="shop-good-list">
          <better-scroll :listenScroll="true" :probeType="probeType" @scroll="onScroll">
            <foodItem v-for="(foodInfo,index) in foodList" :key="foodInfo.food_id" :foodInfo="foodInfo" :foodIndex="index" :selectNum="foodInfo.selectNum" @showType="getTypeInfo" @selectGood="selectGood" />
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
import shopHeader from '@/views/smart/shop-header';
import shopNav from '@/views/smart/shop-nav';

export default {
  name: 'shop-detail',

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
    };
  },
  components: {
    BetterScroll,
    specificationBox,
    cartList,
    foodItem,
    shopHeader,
    shopNav,
  },
  methods: {
    initMenu() {
      // 35为 header-nav的高度
      // 45为 shop-good-tab的高度
      this.bannerHeight = getRect(this.$refs.shopBanner).height - 35;
      this.trackSize = window.innerHeight - 45 - 35 + 1;
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
      // const removeDuplicateItems = arr => [...new Set(arr)];
      // removeDuplicateItems([42, 'foo', 42, 'foo', true, true]);
      //=> [42, "foo", true]
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
.shop-detail {
  background-color: #fff;
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
    width: 70%;
    height: 45px;
    background-color: white;
    display: block;
    margin-bottom: 5px;
    position: relative;
    &::after {
      content: '邀请拼单';
      color: $mt-color;
      position: absolute;
      top: 50%;
      right: -90px;
      transform: translateY(-50%);
      padding: 3px 10px;
      border-radius: 20px;
      border: 1px solid $mt-color;
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
    width: 80px;
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
    margin-left: 90px;
    overflow: hidden;
  }
}
</style>
<style lang="scss">
@import '../assets/style/common';

.shop-detail {
  .van-ellipsis {
  }
  .van-tabs__wrap::after {
    border: 0;
  }
  .van-tabs__line {
    margin-left: 34px;
    width: 25px !important;
    background-color: $mt-color;
  }
  .van-tab--active {
    color: #000;
  }
}
</style>
