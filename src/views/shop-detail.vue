
<template>
  <div class="shopDetail">
    <div class='shop-config' ref='shopConfig'>
      <div class='config-wrapper' :style="{opacity:trackOpacity}"></div>
      <router-link to='/shop/list'>
        <i class='fa fa-angle-left fa-2x'></i>
      </router-link>
      <div class='shop-config_right' :class="{'shop-config_right_white' :isTop}">
        <i class='fa fa-search'></i>
        <i class='fa fa-star-o'></i>
        <i class='fa icon-teambuy'></i>
        <i class='fa icon-more'></i>
      </div>
    </div>

    <div class='shop-banner' ref='shopBanner'>
      <div class='banner-baseInfo'>
        <div class='banner-shopAvatar'>
          <img src='../assets/avatar.jpg'>
        </div>
        <div class='banner-shopInfo'>
          <h4>标题</h4>
          <label>公告</label>
        </div>
      </div>
      <div class='banner-offerInfo'>
        活动信息
      </div>
    </div>

    <div class='shop-good' ref='shopGood' :style="shopGoodStyle">
      <div class='shop-good-tab' ref='shopTab'>
        <van-tabs v-model="tabActive">
          <van-tab v-for="(tab,index) in tabs" :title="tab.label" :key="index"></van-tab>
        </van-tabs>
      </div>
      <div class='shop-good-content'>
        <div class='shop-good-menu' ref='goodMenu'>
          <better-scroll ref="scroll" :data="Types" @pullingDown="onPullingDown" @pullingUp="onPullingUp">
            <div class='menu-item' v-for="catalog in shopInfo.shop_catalog" :key="catalog.value">{{catalog.title}}</div>
          </better-scroll>
        </div>

        <div class='shop-good-list' :style="{marginLeft : trackMarginLeft + 'px'}">
          <better-scroll ref="scroll" :data="Types" @pullingDown="onPullingDown" @pullingUp="onPullingUp" :listenScroll='true' :probeType='probeType' @scroll='onScroll'>

            <div class='good-list-item' v-for="food in shopInfo.food_list" :key="food.food_id">
              <div class='good-image'>
                <img :src='food.photo'>
              </div>
              <div class='good-content'>
                <div class='good-content_info'>
                  <h4 class='good-content_info_title'>{{food.food_title}}</h4>
                  <span class='good-content_info_sale'>月售{{food.food_sale}}</span>
                  <span class='good-content_info_lick'>赞{{food.food_like}}</span>
                  <p class='good-content_info_price'>${{food.food_price}}</p>
                </div>
                <div class='good-content_buy'>
                  <van-button size="small" @click="getTypeInfo(food.type, food.food_id, food.food_price)">选规格</van-button>
                </div>
              </div>
            </div>

          </better-scroll>
        </div>
      </div>
    </div>
    <pop-box title="测试" :visible.sync="showSpBox" :center='true'>
      <div class='specification-box'>
        <div class='box-item' v-for="(typeItem,index) in foodSelected.type" :key="typeItem.value">
          <p class='box-item_title'>{{typeItem.name}}</p>
          <ul class='box-item_specification'>
            <li @click="chooseType(index,type_index,item)" v-for="(item,type_index) in typeItem.content" :key="item.name" :class="{'box-item_selected' : typeItem.selectType === type_index}">
              {{item.label}}
            </li>
          </ul>
        </div>
      </div>
      <div class='specification-footer' slot="footer">
        <div class='footer-info'>
          <span class='footer-info_price'>￥{{foodSelected.totalPrice}}</span>
          <span class='footer-info_specification'>({{foodSelected.tyepInfo}})</span>
        </div>
        <van-button size='small'>
          <i class='fa fa-plus'></i>加入购物车</van-button>
      </div>
    </pop-box>

  </div>
</template>

<script>
import { getRect } from '@/utils/dom';
import { fetchShopDetail } from '@/api/shop';
import BetterScroll from '@/components/scroll/other';
import PopBox from '@/components/popBox';
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
      cartList: [],
      foodSelected: {},
      trackSize: 0, // 商品列表高度
      trackTop: 0, // 商品列表Top
      trackOpacity: 0, // 顶部状态栏opacity
      trackMarginLeft: 0, // 顶部状态栏opacity
    };
  },
  components: {
    BetterScroll,
    PopBox,
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
    getTypeInfo(type, id, price) {
      this.foodSelected = {};
      this.foodSelected.type = type;
      this.foodSelected.id = id;
      this.showSpBox = true;
      this.foodSelected.typeSelected = [];
      this.foodSelected.totalPrice = price;
      this.foodSelected.tyepInfo = '';

      this.foodSelected.type.forEach(item => {
        this.foodSelected.typeSelected.push(item.content[item.selectType]);
        this.foodSelected.tyepInfo += `${item.content[item.selectType].label},`;
        this.foodSelected.totalPrice += parseFloat(item.content[item.selectType].price);
      });
      this.foodSelected.tyepInfo = this.foodSelected.tyepInfo.slice(0, this.foodSelected.tyepInfo.length - 1);
    },
    chooseType(index, typeIndex, typeInfo) {
      const reg = new RegExp(this.foodSelected.typeSelected[index].label);
      this.foodSelected.type[index].selectType = typeIndex;
      this.foodSelected.tyepInfo = this.foodSelected.tyepInfo.replace(reg, typeInfo.label);
      this.foodSelected.totalPrice += parseFloat(typeInfo.price) - this.foodSelected.typeSelected[index].price;
      this.foodSelected.typeSelected[index] = typeInfo;
    },
  },
  created() {
    const shopId = this.$route.params.shop_id;

    fetchShopDetail({ shop_id: shopId }).then(resp => {
      this.shopInfo = resp.data.info;
    });
  },
  mounted() {
    setTimeout(() => {
      this.initMenu();
    }, 20);
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.cartList.forEach(foodItem => {
        total += foodItem.food_price * foodItem.selectNum;
      });
      return total;
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
      color: #ffd161;
    }
  }
}

.shop-banner {
  .banner-baseInfo {
    padding-top: 2rem;
    height: 4rem;
    box-sizing: border-box;
    background: url('../assets/banner.jpg') no-repeat;
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
        justify-content: space-between;
        display: flex;
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
          }
        }
        .good-content_buy {
          position: relative;
          .van-button {
            position: absolute;
            bottom: 0;
            right: 0;
            margin-right: 5px;
            border-radius: 15px;
            background-color: #ffd161;
          }
        }
      }
    }
  }
}
// 规格
.specification-box {
  padding: 10px 5px;
  padding-bottom: 50px;
  .box-item {
    margin-bottom: 10px;
    .box-item_title {
      text-align: left;
      margin: 5px;
    }
    .box-item_specification {
      display: flex;
      justify-content: flex-start;
      li {
        list-style-type: none;
        width: 60px;
        height: 25px;
        line-height: 25px;
        margin: 5px;
        border: 1px solid rgb(179, 178, 178);
        &.box-item_selected {
          color: #ffca46;
          border-color: #ffd161;
          // background-color: #f5f0e5f3;
        }
      }
    }
  }
}
.specification-footer {
  display: flex;
  justify-content: space-between;
  width: 7rem;
  height: 1.2rem;
  box-sizing: border-box;
  padding: 10px 5px;
  background-color: #fdf6f6;
  position: fixed;
  margin-top: -1.2rem;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  .footer-info {
    display: flex;
    justify-content: space-around;
    text-align: left;
  }
  .footer-info_price {
    font-size: 18px;
    color: rgb(190, 23, 23);
    vertical-align: middle;
  }
  .van-button {
    background-color: #ffd161;
    border-radius: 12px;
    font-weight: 700px;
    i {
      margin: 0 5px;
    }
  }
}
</style>
