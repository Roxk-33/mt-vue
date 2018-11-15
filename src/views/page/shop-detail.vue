
<template>
  <div class="shop-detail">
    <shop-nav :trackOpacity="trackOpacity" :isTop="isTop"></shop-nav>
    <div ref="shopBanner" class="shop-header-box">
      <shop-header :title="shopInfo.shop_title" :announcement="shopInfo.announcement" :photo="shopInfo.photo"></shop-header>
    </div>
    <div class="shop-good" ref="shopGood" :style="shopGoodStyle">
      <div class="shop-good-tab">
        <van-tabs v-model="tabActive">
          <van-tab v-for="(tab,index) in tabs" :title="tab.label" :key="index"></van-tab>
        </van-tabs>
      </div>
      <div class="shop-good-content">
        <div class="shop-good-menu">
          <better-scroll :isDisable="scrollDisabel">
            <div class="menu-item" v-for="catalog in shopInfo.shop_catalog" :key="catalog.value">{{catalog.title}}</div>
          </better-scroll>
        </div>
        <div class="shop-good-list">
          <better-scroll :listenScroll="true" :probeType="probeType" @scroll="onScroll" :isDisable="scrollDisabel" @pullingDown="pullingDown">
            <foodItem v-for="(foodInfo,index) in foodList" :key="foodInfo.food_id" :foodInfo="foodInfo" :foodIndex="index" :selectNum="foodInfo.selectNum" @showSpec="getSpecInfo" @adjustNum="adjustNum" />
          </better-scroll>
        </div>
      </div>
    </div>
    <cart-list :threshold="shopInfo.threshold" :freight="shopInfo.freight" :cartList="list" @adjustNum="adjustNum" @toSettle="toSettle"></cart-list>
    <specificationBox @pushCart="getSelectGoood" v-model="showSpecBox" :center="true" width="90%" :foodInfo="foodSelected" :cartList="list">
    </specificationBox>
  </div>
</template>

<script>
import { getRect } from '@/common/dom';
import BetterScroll from '@/views/dumb/scroll';
import specificationBox from '@/views/smart/specification-box';
import cartList from '@/views/smart/cart-list';
import foodItem from '@/views/smart/food-item';
import shopHeader from '@/views/smart/shop-header';
import shopNav from '@/views/smart/shop-nav';
import { deepClone } from '@/common/utils';
import foodIsRepeat from '@/mixins/food-is-repeat';
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
      showSpecBox: false,
      shopInfo: {},
      foodList: [],
      scrollDisabel: false,
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
  mixins: [foodIsRepeat],
  methods: {
    getShopData() {
      this.mtLoading = true;
      this.$store
        .dispatch('shop/getShopDetail', { id: this.shopID })
        .then(resp => {
          this.shopInfo = resp.data;
          this.mtLoading = false;
          this.foodList = this.shopInfo.food_list;
        })
        .catch(err => {
          this.mtLoading = false;
          this.$toast(err);
          this.$router.back(-1);
        });
    },
    scroll() {
      document.addEventListener('scroll', e => {
        const scorllY = Math.abs(
          document.documentElement.scrollTop || window.pageYOffset
        );
        if (!this.scrollDisabel) {
          // 为了兼容Safari
          this.isTop = false;
          if (this.bannerHeight > scorllY) {
            this.trackOpacity = scorllY / this.bannerHeight;
          } else {
            this.scrollDisabel = true;
            this.trackOpacity = '1';
            this.isTop = true;
          }
        } else if (this.bannerHeight > scorllY) {
          this.scrollDisabel = false;
        }
      });
    },
    initMenu() {
      // 35为 header-nav的高度
      // 45为 shop-good-tab的高度
      this.bannerHeight = getRect(this.$refs.shopBanner).height - 35;
      this.trackSize = window.innerHeight - 45 - 35 + 1;
    },
    onScroll(op) {
      if (op.y > 1) {
        console.log('菜单到顶');
        this.scrollDisabel = false;
      }
    },
    pullingDown() {
      console.log('上拉');
      this.scrollDisabel = false;
    },
    getSelectGoood(isExist, specArr, specText, totalPrice, type) {
      if (isExist !== -1) {
        this.adjustNum(type, isExist);
        return;
      }
      const data = {
        specArr,
        foodName: this.foodSelected.food_name,
        specText,
        foodId: this.foodSelected.id,
        totalPrice,
        shop_id: this.shopID,
        picture: this.foodSelected.picture,
      };
      this.pushCart(data, isExist);
    },

    // 去结算
    toSettle() {
      this.$router.push({
        name: 'orderCreate',
        params: { shopId: this.shopID, isAll: true },
      });
    },
    getSpecInfo(index) {
      this.foodSelected = this.foodList[index];
      this.showSpecBox = true;
    },
    /**
     * @description 删除/增加 已选商品
     * @augments type:0为删除1个，1为增加1个；index:下标,indexCart为在购物车中的下标，indexMenu表示在foodList的下标
     */
    adjustNum(type, indexCart = -1, indexMenu = -1) {
      let foodInfo = null;
      if (indexMenu !== -1) {
        foodInfo = this.foodList[indexMenu];
        // 因为从目录中添加商品，无法得知购物车中是否已有
        let index = this.list.findIndex(item => item.food_id === foodInfo.id);

        // 为新增商品
        if (index === -1) {
          const data = {
            specArr: [],
            foodName: foodInfo.food_name,
            specText: [],
            foodId: foodInfo.id,
            totalPrice: foodInfo.price,
            shop_id: this.shopID,
            picture: foodInfo.picture,
          };
          return this.pushCart(data);
        } else {
          indexCart = index;
        }
      }

      if (indexCart !== -1) {
        foodInfo = this.list[indexCart];
      }
      const data = {
        id: foodInfo.id, // 此id为购物车内商品的购物车自增ID
        type: type === 1 ? 1 : -1,
      };
      this.pushCart(data, indexCart);
    },
    pushCart(data, isExist = -1) {
      try {
        if (isExist !== -1) {
          this.$store.dispatch('cart/updateProductToCart', data).then(value => {
            this.$store.dispatch('cart/getCartList');
          });
        } else {
          this.$store.dispatch('cart/addProductToCart', data).then(value => {
            this.$store.dispatch('cart/getCartList');
          });
        }
      } catch (error) {
        console.log(error);
        this.$toast('操作失败');
      }
    },
    showSelectNum() {
      this.foodList.forEach(item => {
        // 非规格商品需要在目录上显示已选数量
        if (item.spec_arr.length === 0) {
          let index = this.list.findIndex(food => food.food_id == item.id);
          if (index !== -1) {
            item.selectNum = this.list[index].num;
          } else {
            item.selectNum = 0;
          }
        }
      });
    },
  },
  created() {
    this.scroll();
  },
  mounted() {
    this.initMenu();
    this.getShopData();
  },
  watch: {
    list(val) {
      this.showSelectNum();
    },
  },
  computed: {
    // 获取特定商店的购物车详情
    list() {
      let arr = this.$store.getters['cart/listArr'];
      let target = arr.find(item => item.shop_info.id == this.shopID);
      if (!target) return [];
      else return target.foodList;
    },

    shopID() {
      return this.$route.params.shopId || 1;
    },
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
@import '~css/common';
.shop-detail {
  background-color: #fff;
}

.shop-banner {
  .banner-baseInfo {
    padding-top: 2rem;
    height: 4rem;
    box-sizing: border-box;
    background: url('../../assets/images/banner.jpg') no-repeat;
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
@import '~css/common';

.shop-detail {
  .van-ellipsis {
  }
  .van-tabs__wrap::after {
    border: 0;
  }
  .van-tabs__line {
    margin-left: 8px;
    width: 25px !important;
    background-color: $mt-color;
  }
  .van-tab--active {
    color: #000;
  }
}
</style>
