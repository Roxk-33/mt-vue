
<template>
  <div class="shop-detail">
    <shop-nav
      :track-opacity="trackOpacity"
      :is-top="isTop"
    />
    <div
      ref="shopBanner"
      class="shop-header-box"
    >
      <shop-header
        :title="shopInfo.shop_title"
        :announcement="shopInfo.announcement"
        :photo="shopInfo.photo"
      />
    </div>
    <div
      class="shop-good"
      ref="shopGood"
      :style="shopGoodStyle"
    >
      <div class="shop-good-tab">
        <van-tabs v-model="tabActive">
          <van-tab
            v-for="(tab,index) in tabs"
            :title="tab.label"
            :key="index"
          />
        </van-tabs>
      </div>
      <div class="shop-good-content">
        <div class="shop-good-menu">
          <better-scroll :is-disable="scrollDisabel">
            <div
              class="menu-item"
              v-for="catalog in shopInfo.shop_catalog"
              :key="catalog.value"
            >{{ catalog.title }}</div>
          </better-scroll>
        </div>

        <div class="shop-good-list">
          <better-scroll
            :listen-scroll="true"
            :probe-type="probeType"
            @scroll="onScroll"
            :is-disable="scrollDisabel"
            @pullingDown="pullingDown"
          >
            <foodItem
              v-for="(foodInfo,index) in foodList"
              :key="foodInfo.food_id"
              :food-info="foodInfo"
              :food-index="index"
              :select-num="foodInfo.selectNum"
              @showSpec="getSpecInfo"
              @adjustNum="adjustNum"
            />
          </better-scroll>
        </div>
      </div>
    </div>
    <cart-list
      :threshold="shopInfo.threshold"
      :freight="shopInfo.freight"
      :cart-list="cartList"
      @adjustNum="adjustNum"
      @toSettle="toSettle"
    />
    <specificationBox
      @pushCart="getSelectGoood"
      v-model="showSpecBox"
      :center="true"
      width="90%"
      :food-info="foodSelected"
      :cart-list="cartList"
    />
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
import foodIsRepeat from '@/mixins/food-is-repeat';

export default {
  name: 'ShopDetail',
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
      specIndex: 0, // 规格商品的index
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
        .then((resp) => {
          this.shopInfo = resp.data;
          this.mtLoading = false;
          this.foodList = this.shopInfo.food_list;
        })
        .catch((err) => {
          this.mtLoading = false;
          this.$toast(err);
          this.$router.back(-1);
        });
    },
    scroll() {
      document.addEventListener('scroll', (e) => {
        const scorllY = Math.abs(
          document.documentElement.scrollTop || window.pageYOffset,
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
    // 规格选项的商品放入购物车
    getSelectGoood(isExist, specArr, specText, totalPrice, type) {
      // 若已存在在购物车中，不需要format数据
      if (isExist !== -1) {
        this.adjustNum(type, isExist, this.specIndex);
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
    // 获取要选规格的商品信息
    getSpecInfo(index) {
      this.specIndex = index;
      this.foodSelected = this.foodList[index];
      this.showSpecBox = true;
    },
    /**
     * @description 删除/增加 已选商品
     * @augments type:0为删除1个，1为增加1个；
     * @augments indexCart为在购物车中的下标;
     * @augments indexMenu表示在foodList的下标，若为-1，则表示商品是从购物车中添加（表明购物车中已有该商品）
     * indexCart和indexMenu不可能同时为-1
     */
    adjustNum(type, indexCart = -1, indexMenu = -1) {
      let foodInfo = null;
      let data = {};

      // 获取商品信息
      if (indexMenu !== -1) {
        foodInfo = this.foodList[indexMenu];
      }

      // 因为从目录中添加商品，无法得知购物车中商品对应的下标
      if (indexCart === -1) {
        indexCart = this.cartList.findIndex(
          item => item.food_id === foodInfo.id,
        );
      }
      const foodCartInfo = this.cartList[indexCart];

      // 购物车中已有该商品
      if (indexCart !== -1) {
        data = {
          foodId: foodCartInfo.food_id,
          id: foodCartInfo.id, // 此id为购物车内商品的购物车自增ID
          type
        };
      } else {
        // 为新增商品
        data = {
          specArr: [],
          foodName: foodInfo.food_name,
          specText: [],
          foodId: foodInfo.id,
          totalPrice: foodInfo.price,
          shop_id: this.shopID,
          picture: foodInfo.picture,
        };
      }

      this.pushCart(data, indexCart, indexMenu);
    },
    // 发送新增商品到购物车的请求
    //
    pushCart(data, isExist = -1, indexMenu = -1) {
      if (indexMenu === -1) {
        indexMenu = this.foodList.findIndex(item => item.id === data.foodId);
      }
      try {
        if (isExist !== -1) {
          this.$store.dispatch('cart/updateProductToCart', data).then((value) => {
            this.$store.dispatch('cart/getCartList');
            if (data.type === 1) {
              this.foodList[indexMenu].selectNum++;
            } else {
              this.foodList[indexMenu].selectNum--;
            }
          });
        } else {
          this.$store.dispatch('cart/addProductToCart', data).then((value) => {
            this.$store.dispatch('cart/getCartList');
            this.foodList[indexMenu].selectNum++;
          });
        }
      } catch (error) {
        console.log(error);
        this.$toast('操作失败');
      }
    },
    showSelectNum() {
      this.foodList.forEach((item) => {
        const index = this.cartList.findIndex(food => food.food_id == item.id);
        if (index !== -1) {
          item.selectNum = this.cartList[index].num;
        } else {
          item.selectNum = 0;
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
    cartList(val) {
      this.showSelectNum();
    },
  },
  computed: {
    // 获取特定商店的购物车详情
    cartList() {
      const arr = this.$store.getters['cart/listArr'];
      const target = arr.find(item => item.shop_info.id == this.shopID);
      if (!target) return [];
      return target.foodList;
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
