<template>
  <div class="user-cart">
    <header-nav
      :is-back="true"
      :title="headerTitle"
      @click-left="$router.back(-1);"
    >
      <span>编辑</span>
    </header-nav>
    <div class="cart-list">
      <div
        class="cart-list-item"
        v-for="item in cartList"
        :key="item.shop_info.shop_id"
      >
        <div class="item-title">
          <check-box
            v-model="item.selectAll"
            @click="selectAll(item)"
          />
          <router-link
            class="content"
            :to="{ name: 'shopDetail', params: { id: item.shop_info.id }}"
            tag="div"
          >
            <img
              class="shop-avatar"
              :src="item.shop_info.photo"
            >

            <span class="shop-title">{{ item.shop_info.shop_title }}</span>
            <i class='iconfont icon-xiangyou' />
            <!-- TODO:二期实现促销功能 -->
            <!-- <div class="shop-discount">
              <div class="discount-icon">促销</div>
              <p class="shop-discount-info">满15减1</p>
            </div> -->
          </router-link>
        </div>
        <div class="food-list">
          <van-checkbox-group v-model="item.selArr">
            <div
              class="food-list-item"
              v-for="foodInfo in item.foodList"
              :key="foodInfo.id"
            >
              <van-checkbox :name="foodInfo.id" />
              <div class="content">
                <div class="food-info-box">
                  <img
                    class="food-img"
                    :src="foodInfo.picture"
                  >
                  <div class="food-info">
                    <p class="food-info-title">{{ foodInfo.food_name }}</p>
                    <p class="food-info-spec">规格：{{ foodInfo.spec_text.join(',') }}</p>
                    <div class="food-info-num">
                      <span class="num">x{{ foodInfo.num }}</span>
                      <span class="price">￥{{ foodInfo.num * foodInfo.price }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </van-checkbox-group>

          <div class="fee-info">
            <div class="mt-flex-space-between fee-info-item">
              <span>运费</span>
              <span>￥{{ item.shop_info.freight }}</span>
            </div>
          </div>
        </div>
        <div class="settle-info mt-flex-space-between">
          <span class="other-info" />
          <!-- <span class="other-info">已优惠2元</span> -->
          <div class="right">
            <span class="total-price">{{ item.totalPrice }}元</span>
            <button
              class="settle-btn"
              :class="{'not' : (item.shop_info.threshold - item.totalPrice > 0)} "
            >
              <span v-if="item.shop_info.threshold - item.totalPrice > 0">差￥{{ item.shop_info.threshold - item.totalPrice }}起送</span>
              <span
                v-else
                @click="toPay(item)"
              >去结算</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import headerNav from "@/views/dumb/header-nav";
import checkBox from "@/views/dumb/check-box";
import { deepClone } from "@/common/utils";

export default {
  name: "userCartList",

  data() {
    return {
      checked: false,
      headerTitle: "购物车",
      cartList: []
    };
  },
  components: {
    headerNav,
    checkBox
  },
  created() {
    this.getCart();
  },
  methods: {
    selectAll(target) {
      const len = target.selArr.length;
      target.selArr.splice(0, target.selArr.length);
      if (len !== target.foodList.length) {
        target.foodList.forEach(item => {
          target.selArr.push(item.id);
        });
      }
    },
    // 无法直接更store
    getCart() {
      const temp = deepClone(this.list);
      temp.forEach(item => {
        const selArr = [];
        let totalPrice = 0;
        item.foodList.forEach(item => {
          totalPrice += item.num * item.price;
          selArr.push(item.id);
        });
        const obj = Object.assign({}, item, {
          selArr,
          totalPrice,
          selectAll: true
        });
        this.cartList.push(obj);
      });
    },
    toPay(target) {
      const foodIdArr = target.selArr;
      let isAll = false;
      if (foodIdArr.length === 0) return this.$toast("请选择商品");

      // 长度相同表示全选
      if (foodIdArr.length === target.foodList.length) isAll = true;
      this.$router.push({
        name: "orderCreate",
        params: { shopId: this.shopID, isAll, foodIdArr }
      });
    }
  },
  computed: {
    list() {
      return this.$store.getters["cart/listArr"];
    }
  },
  filters: {
    getTotalPrice(item) {
      const price = item.shop_info.freight;
      return item.foodList.reduce(
        (totalPrice, item) => (totalPrice += item.num * item.price),
        price
      );
    }
  },
  watch: {
    list() {
      this.getCart();
    }
  }
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
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
    .check-box {
      margin-left: 9px;
    }
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
        display: flex;
        align-items: center;
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
      margin: 10px 10px 10px 30px;
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
      span {
        display: inline-block;
        width: 100%;
        height: 100%;
        line-height: 30px;
      }
      &.not {
        background-color: $mt-gray;
        color: #fff;
      }
    }
  }
}
.van-checkbox {
  display: inline-block;
  vertical-align: top;
  margin: 0 5px;
  transform: scale(0.8);
}
</style>
