
<template>
  <div class="shop-detail">
    <shop-nav :track-opacity="trackOpacity" :is-top="isTop" />
    <div ref="shopBanner" class="shop-header-box test">
      <shop-header
        :title="shopInfo.shop_title"
        :announcement="shopInfo.announcement"
        :photo="shopInfo.photo"
      />
    </div>
    <div class="shop-good" :style="shopGoodStyle">
      <div class="shop-good-tab">
        <van-tabs v-model="tabActive" :line-width="25" swipeable sticky>
          <van-tab
            v-for="(tab, index) in tabs"
            :title="tab.label"
            :key="index"
          />
        </van-tabs>
      </div>
      <div class="shop-good-content" v-if="tabActive === 0">
        <div class="shop-good-menu">
          <mt-better-scroll
            :options="scrollOption"
            :is-disable="FoodListScrollDisabel"
          >
            <div
              class="menu-item"
              v-for="(category, index) in foodCatalog"
              :key="category.id"
              :class="{ 'active-index': currentIndex === index }"
              @click="scrollToCat(index)"
            >
              {{ category.label }}
            </div>
          </mt-better-scroll>
        </div>
        <div class="shop-good-list">
          <mt-better-scroll
            :listen-scroll="true"
            :options="scrollOption"
            @scroll="onFoodListScroll"
            :is-disable="FoodListScrollDisabel"
            @pulling-down="onFoodListPullingDown"
            ref="foodlist"
          >
            <food-item
              v-for="(foodInfo, index) in foodList"
              :key="foodInfo.food_id"
              :food-info="foodInfo"
              :food-index="index"
              :select-num="foodInfo.selectNum"
              @showSpec="getSpecInfo"
              @adjustNum="adjustNum"
            />
          </mt-better-scroll>
        </div>
      </div>
      <shopDetailReview v-if="tabActive === 1" :shopId="shopId" />
    </div>
    <cart-list
      :threshold="shopInfo.threshold"
      :freight="shopInfo.freight"
      :cart-list="cartList"
      @adjustNum="adjustNum"
      @toSettle="toSettle"
      @emptyCart="emptyCart"
      :isBusiness="isBusiness"
    />
    <specificationBox
      @pushSpecToCart="pushSpecFood"
      v-model="showSpecBox"
      :center="true"
      width="90%"
      :food-info="foodSelected"
      :cart-list="cartList"
    />
  </div>
</template>

<script>
import parabolaAni from "@/mixins/parabola-ani";
import specificationBox from "@/views/smart/specification-box";
import cartList from "@/views/smart/cart-list";
import foodItem from "@/views/smart/food-item";
import shopHeader from "@/views/smart/shop-header";
import shopNav from "@/views/smart/shop-nav";
import foodIsRepeat from "@/mixins/food-is-repeat";
import shopDetailScroll from "@/mixins/shop-detail-scroll";
import shopDetailReview from "@/views/smart/shop-detail-review";
import { scrollTo } from "@/common/utils";
import { isBusinessHours } from "@/common/utils";

export default {
  name: "ShopDetail",
  data() {
    return {
      isBusiness: 0,
      tabs: [
        {
          label: "点菜",
          value: "menu"
        },
        {
          label: "评价",
          value: "review"
        }
      ],
      foodCatalog: [],
      listHeight: [0],
      tabActive: 0,
      showSpecBox: false,
      shopInfo: {},
      foodList: [],
      foodSelected: {},
      currentIndex: 0,
      specIndex: 0 // 规格商品的index
    };
  },
  components: {
    specificationBox,
    cartList,
    foodItem,
    shopHeader,
    shopNav,
    shopDetailReview
  },
  mixins: [foodIsRepeat, parabolaAni, shopDetailScroll],
  methods: {
    getShopData() {
      this.mtLoading = true;
      this.$store
        .dispatch("shop/getShopDetail", { id: this.shopId })
        .then(resp => {
          this.shopInfo = resp.data;
          this.mtLoading = false;
          this.adjustSort(this.shopInfo.category_list, this.shopInfo.food_list);
          this.isBusiness = isBusinessHours(
            this.shopInfo.business_hours,
            this.shopInfo.closing_hours
          );

          if (this.isBusiness === 1) {
            return this.$toast("商店已休息");
          }
        })
        .catch(err => {
          console.log(err);
          this.mtLoading = false;
          this.$toast(err);
          this.$router.back(-1);
        });
    },
    adjustSort(foodCatalog, foodList) {
      this.foodCatalog = foodCatalog.filter(item => {
        return foodList.some(food => food.category_id === item.id);
      });
      let sortArr = {};
      this.foodCatalog.forEach(item => {
        sortArr[item.id] = item.sort;
      });
      this.foodList = foodList.sort((prev, next) => {
        return sortArr[prev.category_id] - sortArr[next.category_id];
      });

      let indexId = this.foodList[0].category_id;
      let lineHeight = 0;

      this.foodList.forEach(item => {
        if (indexId !== item.category_id) {
          this.listHeight.push(lineHeight);
          indexId = item.category_id;
        } else {
          lineHeight -= 68;
        }
      });
    },
    scrollToCat(index) {
      const scrollHeight = this.listHeight[index];
      this.FoodListScrollDisabel = false;
      scrollTo(this.bannerHeight);

      this.$refs.foodlist.scrollTo(0, scrollHeight, 400);
    },

    // 规格选项的商品放入购物车
    pushSpecFood(isExist, specArr, specText, totalPrice, type, ev = null) {
      // 若已存在在购物车中，不需要format数据
      if (isExist !== -1) {
        this.adjustNum(type, isExist, this.specIndex, ev);
        return;
      }
      const data = {
        specArr,
        foodName: this.foodSelected.food_name,
        specText,
        foodId: this.foodSelected.id,
        totalPrice,
        shop_id: this.shopId,
        picture: this.foodSelected.picture
      };
      this.pushCart(data, isExist, -1, ev);
    },
    // 清空购物车
    emptyCart() {
      this.$store.dispatch("cart/emptyCart", this.shopId).then(value => {
        this.$store.dispatch("cart/getCartList");
      });
    },
    // 去结算
    toSettle() {
      this.$router.push({
        name: "orderCreate",
        query: { shopId: this.shopId, isAll: true }
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
    adjustNum(type, indexCart = -1, indexMenu = -1, ev) {
      let foodInfo = null;
      let data = {};

      // 获取商品信息
      if (indexMenu !== -1) {
        foodInfo = this.foodList[indexMenu];
      }

      // 因为从目录中添加商品，无法得知购物车中商品对应的下标
      if (indexCart === -1) {
        indexCart = this.cartList.findIndex(
          item => item.food_id === foodInfo.id
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
        const price =
          foodInfo.discount_info === null
            ? foodInfo.price
            : foodInfo.discount_info.discount;
        data = {
          specArr: [],
          foodName: foodInfo.food_name,
          specText: [],
          foodId: foodInfo.id,
          totalPrice: price,
          shop_id: this.shopId,
          picture: foodInfo.picture
        };
      }

      this.pushCart(data, indexCart, indexMenu, ev);
    },
    startBallAni(ev) {
      this.ballAniPoi.start.left = ev.screenX;
      this.ballAniPoi.start.top = ev.screenY;
      // 补偿位差
      if (this.FoodListScrollDisabel) {
        this.ballAniPoi.start.top -= 200;
      }
      this._startBallAni();
    },
    // 发送新增商品到购物车的请求
    pushCart(data, isExist = -1, indexMenu = -1, ev) {
      if (indexMenu === -1) {
        indexMenu = this.foodList.findIndex(item => item.id === data.foodId);
      }
      try {
        if (isExist !== -1) {
          this.$store
            .dispatch("cart/updateProductToCart", data)
            .then(value => {
              this.$store.dispatch("cart/getCartList");
              if (data.type === 1) {
                this.foodList[indexMenu].selectNum++;
                this.startBallAni(ev);
              } else {
                this.foodList[indexMenu].selectNum--;
              }
            })
            .catch(err => {
              this.$toast(err);
            });
        } else {
          this.$store
            .dispatch("cart/addProductToCart", data)
            .then(value => {
              try {
                this.$store.dispatch("cart/getCartList");
                this.foodList[indexMenu].selectNum++;
                this.startBallAni(ev);
              } catch (error) {
                console.log(error);
              }
            })
            .catch(err => {
              console.log(err);
              this.$toast(err);
            });
        }
      } catch (error) {
        console.log(error);
        this.$toast("操作失败");
      }
    },
    showSelectNum() {
      this.foodList.forEach(item => {
        const index = this.cartList.findIndex(food => food.food_id == item.id);
        if (index !== -1) {
          item.selectNum = this.cartList[index].num;
        } else {
          item.selectNum = 0;
        }
      });
    }
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
    scrollY(newY) {
      const listHeight = this.listHeight;
      // 当滚动到顶部，newY>0
      if (newY > -5) {
        this.currentIndex = 0;
        return;
      }
      // 在中间部分滚动
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i];
        let height2 = listHeight[i + 1];
        if (newY <= height1 && newY > height2) {
          this.currentIndex = i;

          // this.diff = height2 + newY;
          return;
        }
      }
      // 当滚动到底部，且-newY大于最后一个元素的上限
      this.currentIndex = listHeight.length - 1;
    }
  },
  computed: {
    // 获取特定商店的购物车详情
    cartList() {
      const arr = this.$store.getters["cart/cartList"];
      const target = arr.find(item => item.shop_info.id == this.shopId);
      if (!target) return [];
      return target.foodList;
    },

    shopId() {
      return this.$route.params.id;
    }
  }
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
    height: 45px;
    background-color: white;
    display: block;
    margin-bottom: 5px;
    padding-bottom: 3px;
    border-bottom: 1px solid $mt-light-gray;
    position: relative;
    // &::after {
    //   content: "邀请拼单";
    //   color: $mt-color;
    //   position: absolute;
    //   top: 50%;
    //   right: 6px;
    //   transform: translateY(-50%) scale(0.9);
    //   padding: 3px 10px;
    //   border-radius: 20px;
    //   border: 1px solid $mt-color;
    // }
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
    background-color: #ececec;
    overflow: hidden;
    .menu-item {
      width: 100%;
      padding: 15px 5px 15px 8px;
      font-size: 12px;
      text-align: left;
      box-sizing: border-box;
      &.active-index {
        background-color: #fff;
        color: #000;
      }
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
  .van-tab {
    font-size: 16px;
  }
  .van-tabs__wrap::after {
    border: 0;
  }
  .van-tabs__line {
    // margin-left: 8px;
    background-color: $mt-color;
  }
  .van-tab--active {
    color: #000;
  }
}
.parabola-ani {
  background-color: $mt-color;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  z-index: $zindex-modal;
}
</style>
