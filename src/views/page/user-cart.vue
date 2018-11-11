<template>
  <div class="user-cart">
    <header-nav :is-back="true" :title="headerTitle" @click-left="$router.back(-1);">
      <span>编辑</span>
    </header-nav>
    <div class="cart-list">
      <div class="cart-list-item" v-for="item in list" :key="item.shop_info.shop_id">
        <router-link class="item-title" :to="{ path: '/shop/detail', params: { shopId: item.shop_info.id }}">
          <van-checkbox v-model="checked" checked-color="#4b0"></van-checkbox>
          <div class="content">
            <img class="shop-avatar" :src="item.shop_info.photo">
            <span class="shop-title">{{item.shop_info.shop_title}}</span>
            <i class='iconfont icon-xiangyou'></i>
            <!-- TODO:二期实现促销功能 -->
            <!-- <div class="shop-discount">
              <div class="discount-icon">促销</div>
              <p class="shop-discount-info">满15减1</p>
            </div> -->
          </div>
        </router-link>
        <div class="food-list">
          <router-link class="food-list-item" v-for="foodInfo in item.foodList" :key="foodInfo.id" :to="{ path: '/shop/detail', params: { shopId: item.shop_info.id }}">
            <van-checkbox v-model="checked" checked-color="#4b0"></van-checkbox>
            <div class="content">
              <div class="food-info-box">
                <img class="food-img" :src="foodInfo.picture">
                <div class="food-info">
                  <p class="food-info-title">{{foodInfo.food_name}}</p>
                  <p class="food-info-spec">规格：{{foodInfo.spec_text.join(',')}}</p>
                  <div class="food-info-num">
                    <span class="num">x{{foodInfo.num}}</span>
                    <span class="price">￥{{foodInfo.num * foodInfo.price}}</span>
                  </div>
                </div>
              </div>
            </div>
          </router-link>

          <div class="fee-info">
            <div class="mt-flex-space-between fee-info-item">
              <span>包装费</span>
              <span>￥1</span>
            </div>
          </div>
        </div>
        <div class="settle-info mt-flex-space-between">
          <span class="other-info">已优惠2元</span>
          <div class="right">
            <span class="total-price">{{item.foodList | getTotalPrice}}元</span>
            <button class="settle-btn">
              <span>去结算</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import headerNav from '@/views/dumb/header-nav';
import { mapGetters } from 'vuex';
export default {
  name: 'user-cart',

  data() {
    return {
      checked: false,
      headerTitle: '购物车',
    };
  },
  components: {
    headerNav,
  },
  mounted() {
    console.log(this.list);
  },
  methods: {},
  computed: {
    // ...mapGetters({
    //   list: 'cart/list'
    // }),
    list() {
      console.log(this.$store.getters['cart/list']);
      return this.$store.getters['cart/list'].reduce((previous, current) => {
        let index = previous.findIndex(
          item => item.shop_info.id == current.shop_id
        );
        if (index === -1)
          previous.push({ shop_info: current.shop_info, foodList: [current] });
        else previous[index].foodList.push(current);
        return previous;
      }, []);
    },
  },
  filters: {
    getTotalPrice(foodList) {
      return foodList.reduce(
        (totalPrice, item) => (totalPrice += item.num * item.price),
        0
      );
    },
  },
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
@import '~css/common';
.cart-list-item {
  margin-bottom: 10px;
  background-color: #fff;
  padding: 5px 0;
  .content {
    display: inline-block;
  }
  .item-title {
    color: #000;
    height: 33px;
    display: inline-block;
    .shop-avatar {
      width: 25px;
      height: 25px;
      vertical-align: middle;
    }

    .shop-title {
      vertical-align: middle;
      font-size: 17px;
      margin: 0 0 0 5px;
    }
    .iconfont {
      vertical-align: middle;
      font-size: 12px;
    }
    .shop-discount {
      padding: 8px 0;
      .discount-icon {
        border: 1px solid #ff0000a8;
        color: #ff0000a8;
        padding: 1px 4px;
        transform: scale(0.9);
        display: inline-block;
      }
      .shop-discount-info {
        display: inline-block;
      }
    }
  }
  .food-list {
    .food-list-item {
      display: flex;
      margin-bottom: 5px;
      .van-checkbox {
        vertical-align: middle;
      }
      .content {
        flex: 1;
      }
      .food-info-box {
        background-color: #bebdbd36;
        height: 60px;
        display: flex;
        .food-img {
          height: 100%;
          width: 60px;
        }
        .food-info {
          flex: 1;
          padding: 0 10px 0 5px;
          vertical-align: top;
          display: inline-block;
          p {
            margin: 4px 0;
          }
          .food-info-title {
            color: #000;
            font-size: 15px;
          }
          .food-info-spec,
          .food-info-num {
            color: gray;
          }
          .food-info-num {
            .price {
              color: #000;
              float: right;
            }
          }
        }
      }
    }
    .fee-info-item {
      margin: 5px 10px 5px 30px;
    }
  }
  .settle-info {
    border-top: 1px solid #bebdbd36;
    padding-top: 5px;
    margin: 0 5px 0 30px;
    overflow: hidden;
    align-items: center;
    .total-price {
      margin-right: 15px;
      color: red;
      font-size: 18px;
      vertical-align: middle;
    }
    .settle-btn {
      vertical-align: middle;
      width: 80px;
      height: 30px;
      background-color: $mt-color;
      text-align: center;
      border: 0;
    }
  }
}
.van-checkbox {
  display: inline-block;
  vertical-align: top;
  margin: 0 5px;
}
</style>
