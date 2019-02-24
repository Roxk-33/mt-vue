<template>
  <div class="order-pay">
    <header-nav
      :title="headerTitle"
      :on-left="true"
      :border="false"
      headerbgColor="#fbd475"
      @click-left="$router.back(-1)"
    />
    <div class="order-pay-header">
      <div class="header-address box-right-arrow " @click="showAddress = true">
        <p class="address-content" v-if="orderInfo.address.address">
          {{ orderInfo.address.address }}
        </p>
        <span class="address-person" v-if="orderInfo.address.user_name"
          >{{ orderInfo.address.user_name }} {{ orderInfo.address.tel }}</span
        >
        <p v-else class="address-select">请选择地址</p>
        <i class="iconfont icon-xiangyou right" />
      </div>
      <div class="header-shipping-time box-right-arrow mt-flex-space-between">
        <span class="shipping-type">立即送出</span>
        <!-- 送达时间暂时定为当前时间后15分钟 -->
        <span class="shipping-time"
          >大约{{ orderInfo.arrivalTime.substr(-5) }}送达</span
        >
        <i class="iconfont icon-xiangyou right" />
      </div>
    </div>
    <div class="order-pay-main">
      <div class="main-header order-pay-main-item">
        <span>{{ shopInfo.shop_title }}</span>
      </div>
      <ul class="main-food-list order-pay-main-item">
        <li class="food-list-item" v-for="item in foodList" :key="item.id">
          <div class="food-pic">
            <img :src="item.picture" />
          </div>
          <!-- TODO:样式实现较差，需要优化 -->
          <div class="food-info">
            <div class="food-info-main mt-flex-space-between">
              <div class="food-info-name">
                {{ item.food_name }}
                <!-- <span class='food-info-discount'>折</span> -->
              </div>
              <div class="food-info-price">
                <!-- <span class='food-info-price_original'>￥64</span> -->
                ￥{{ item.price }}
              </div>
            </div>
            <!-- 规格 -->
            <p class="food-info-type">{{ item.spec_text.join(",") }}</p>
            <p class="food-info-num">x{{ item.num }}</p>
          </div>
        </li>
      </ul>
      <div class="food-fee">
        <!-- <div>
          <span class='food-fee-title'>包装费</span>
          <span class='food-fee-price'>￥16</span>
        </div> -->
        <div>
          <span class="food-fee-title">配送费</span>
          <span class="food-fee-price">￥{{ shopInfo.freight }}</span>
        </div>
      </div>
      <div class="food-pay">
        <!-- <span>已优惠
          <i class='food-pay-discount'>￥21.2</i>
        </span> -->
        <span
          >小计
          <i class="food-pay-total">￥{{ totalPrice }}</i>
        </span>
      </div>
    </div>
    <div class="order-pay-note">
      <div
        class="order-pay-note-item box-right-arrow mt-flex-space-between"
        @click="
          showRemarks = true;
          tempRemarks = orderInfo.remarks;
        "
      >
        <span class="note-item-left">备注</span>
        <div class="note-item-right-box">
          <span class="note-item-right">{{ orderInfo.remarks }}</span>
          <i class="iconfont icon-xiangyou" />
        </div>
      </div>
      <div
        class="order-pay-note-item box-right-arrow mt-flex-space-between"
        @click="showTableware = true"
      >
        <span class="note-item-left">餐具数量</span>
        <div class="note-item-right-box">
          <span class="note-item-right">{{
            orderInfo.tableware !== null ? orderInfo.tableware + "人" : "未选择"
          }}</span>
          <i class="iconfont icon-xiangyou" />
        </div>
      </div>
      <!-- <div class='order-pay-note-item box-right-arrow mt-flex-space-between'>
        <span class='note-item-left'>发票</span>
        <span class='note-item-right' />
        <i class='iconfont icon-xiangyou' />
      </div> -->
      <div class="order-pay-note-item box-right-arrow mt-flex-space-between">
        <span class="note-item-left">支付方式</span>
        <div class="note-item-right-box">
          <span class="note-item-right">在线支付</span>
        </div>
        <!-- <i class='iconfont icon-xiangyou'></i> -->
      </div>
    </div>

    <div class="footer-box mt-flex-space-between">
      <div class="footer-box-left mt-flex-space-between">
        <!-- <span class='footer-left_discount'>
          已优惠￥40.4
        </span> -->
        合计￥
        <span class="footer-left_total">
          {{ totalPrice }}
        </span>
      </div>
      <div class="footer-box-right" @click="sumbitOrder">
        <span>提交订单</span>
      </div>
    </div>

    <van-popup v-model="showPay" position="bottom" :overlay="true">
      <pop-up @cancel="cancel('pay')">
        <div class="pay-way-box">
          <p @click="cancel('pay')">在线支付</p>
          <p @click="cancel('pay')">货到付款</p>
        </div>
      </pop-up>
    </van-popup>
    <van-actionsheet
      v-model="showTableware"
      :actions="tablewareList"
      cancel-text="取消"
      @select="onSelectTableware"
      @cancel="showTableware = false"
    />
    <!-- 收货地址 -->
    <van-popup v-model="showAddress" position="bottom" :overlay="true">
      <pop-up
        class="address-list"
        @cancel="cancel('address')"
        @clickHeaderLeft="cancel('address')"
        header-title="选择收货地址"
        header-left="取消"
        bottom-text="新增收货地址"
        bottom-text-icon="icon-add_icon"
      >
        <div class="address-list-box">
          <ul class="list-box">
            <li
              class="list-box-item"
              v-for="(item, index) in addressList"
              :key="item.id"
              @click="selAddress(index)"
            >
              <van-radio
                :name="true"
                v-model="item.selected"
                @click="selAddress(index)"
                :checked-color="mtColor"
              />
              <div class="content">
                <div class="address">
                  {{ item.address }}
                  <div
                    class="tag"
                    v-if="item.tag !== ''"
                    :class="{
                      school: item.tag == 0,
                      company: item.tag == 1,
                      home: item.tag == 2
                    }"
                  >
                    {{ TAGS[item.tag] }}
                  </div>
                </div>
                <p class="person">
                  <span class="name">{{ item.user_name }}</span
                  ><span>{{ item.tel }}</span>
                </p>
              </div>
              <div class="edit-icon">
                <i class="iconfont icon-xiugai1" />
              </div>
            </li>
          </ul>
        </div>
      </pop-up>
    </van-popup>
    <!-- 备注 -->
    <van-popup v-model="showRemarks" position="right" :overlay="false">
      <div class="remark-box">
        <header-nav
          title="添加备注"
          @click-left="showRemarks = false"
          :on-left="true"
        >
          <span @click="saveRemarks" class="save-btn">完成</span>
        </header-nav>
        <van-field
          v-model="tempRemarks"
          type="textarea"
          class="content"
          :placeholder="remaskPlaceholder"
          rows="1"
          :autosize="remaskField"
        />
      </div>
    </van-popup>
  </div>
</template>

<script type="text/ecmascript-6">
import popUp from "@/views/dumb/pop-up";
import CONSTANT from "@/common/constant";
import headerNav from "@/views/dumb/header-nav";
import { getDelayTime } from "@/common/utils";

export default {
  name: "OrderPay",

  data() {
    return {
      headerTitle: "提交订单",
      SEX: CONSTANT.TYPE.SEX_EN,
      TAGS: CONSTANT.TYPE.TAGS,
      mtColor: CONSTANT.COLOR.MT,
      remaskPlaceholder: "请输入口味、偏好等要求，不支持额外代沟其他物品哦~",
      remaskField: { maxHeight: 100, minHeight: 50 },
      showPay: false,
      showRemarks: false,
      showAddress: false,
      showTableware: false, // 餐具数量
      foodList: [],
      addressList: [],
      shopInfo: {},
      tempRemarks: "",
      orderInfo: {
        address: {},
        remarks: "",
        shopId: this.shopId,
        arrivalTime: getDelayTime(40),
        tableware: null
      },
      tablewareList: [
        {
          name: "不需要餐具",
          value: 0
        },
        {
          name: "1人",
          value: 1
        },
        {
          name: "2人",
          value: 2
        },
        {
          name: "3人",
          value: 3
        },
        {
          name: "4人",
          value: 4
        }
      ]
    };
  },
  components: {
    popUp,
    headerNav
  },

  created() {
    if (!this.shopId) {
      this.$toast("非法操作！");
      this.$router.push({ name: "userIndex" });
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.mtLoading = true;
      this.$store
        .dispatch("user/getAddressList")
        .then(resp => {
          this.mtLoading = false;
          this.addressList = this.addressList.concat(resp.data);
          this.getDefaultAddress();
        })
        .catch(e => {
          this.router.push("/error");
          this.$toast(e);
        });

      this.$store
        .dispatch("cart/getCartListByShop", { shopId: this.shopId })
        .then(resp => {
          this.mtLoading = false;
          if (resp.data.length === 0) {
            this.$toast("未选购商品");
            return this.router.push("/user/cart");
          }
          if (this.foodIdArr.length) {
            this.foodList = resp.data.filter(
              item => this.foodIdArr.indexOf(item.id) !== -1
            );
          } else {
            this.foodList = resp.data;
          }
          this.shopInfo = this.foodList[0].shop_info;
        })
        .catch(e => {
          this.router.push("/error");
          this.$toast(e);
        });
    },
    // 选择餐具数量
    onSelectTableware(data) {
      this.orderInfo.tableware = data.value;
      this.cancel("tableware");
    },
    // 获取默认地址
    getDefaultAddress() {
      console.log(this.addressList);
      this.addressList.forEach(item => {
        item = Object.assign({}, item, { select: false });
        if (item.is_default) {
          item.selected = true;
          this.orderInfo.address = item;
        }
      });
    },
    selAddress(index) {
      this.orderInfo.address.selected = false;
      this.addressList[index].selected = true;
      this.orderInfo.address = this.addressList[index];
      this.cancel("address");
    },
    cancel(type) {
      switch (type) {
        case "address":
          this.showAddress = false;
          break;
        case "pay":
          this.showPay = false;
          break;
        case "remarks":
          this.showRemarks = false;
          break;
        case "tableware":
          this.showTableware = false;
          break;
      }
    },
    saveRemarks() {
      this.orderInfo.remarks = this.tempRemarks;
      this.cancel("remarks");
    },
    sumbitOrder() {
      if (!this.orderInfo.address.address) {
        return this.$toast("请选择地址");
      }
      this.orderInfo.cartIdArr = this.foodIdArr;
      this.orderInfo.shopId = parseInt(this.shopId);
      this.$store
        .dispatch("order/sumbitOrder", this.orderInfo)
        .then(resp => {
          this.$router.push({
            name: "orderPay",
            params: {
              orderId: resp.data.order_info.id,
              price: resp.data.order_info.total_price,
              shopTitle: this.shopInfo.shop_title,
              deadLineTime: resp.data.order_info.order_status.deadline_pay_time
            }
          });
          // 重新获取购物车
          this.$store.dispatch("cart/getCartList");
        })
        .catch(err => {
          console.log(err);
          this.$toast(err);
        });
    }
  },
  computed: {
    totalPrice() {
      let price = this.shopInfo.freight;
      if (this.foodList.length === 0) return 0;
      return this.foodList.reduce(
        (previous, current) => (previous += current.price * current.num),
        price
      );
    },
    shopId() {
      return this.$route.params.shopId || 1;
    },
    isAll() {
      return this.$route.params.isAll || false;
    },
    foodIdArr() {
      return this.$route.params.foodIdArr || [];
    }
  }
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.order-pay {
  height: 100%;
}
.order-pay-header {
  margin: 0 3px 5px;
  background-color: #fff;
  .header-address,
  .header-shipping-time {
    padding: 10px 30px 10px 20px;
  }
  .header-address {
    border-bottom: 1px solid #e6e5e5;
    text-align: left;
    font-size: 13px;
    .address-select {
      font-size: 20px;
      color: $mt-gray;
    }
    .address-content {
      font-size: 20px;
      font-weight: 700;
      margin: 5px 0;
    }
  }
  .header-shipping-time {
    font-size: 15px;
    .shipping-type {
      font-weight: 700;
    }
    .shipping-time {
      color: rgb(89, 89, 216);
    }
  }
}
.order-pay-main {
  background-color: #fff;
  padding: 5px 20px;
  font-size: 15px;
  margin: 5px 3px;
  .order-pay-main-item {
    border-bottom: 1px solid #e6e5e5;
    padding: 10px 0;
  }
  .main-header {
    color: #888;
    line-height: 0.5rem;
    text-align: left;
  }
  .main-food-list {
    .food-list-item {
      &:not(:last-child) {
        margin-bottom: 10px;
      }
      display: flex;
      justify-content: flex-start;
      .food-pic {
        width: 18%;
        height: 60px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .food-info {
        margin-left: 5px;
        width: 82%;
        text-align: left;

        .food-info-main {
          line-height: 21px;
          height: 21px;
          .food-info-name {
            font-weight: 700;
            padding-right: 30px;
            display: inline-flex;
            align-items: center;
          }
          .food-info-discount {
            width: 17px;
            text-align: center;
            height: 15px;
            line-height: 15px;
            color: #fff;
            font-size: 11px;
            margin-left: 10px;
            background-color: purple;
          }
          .food-info-price {
            line-height: 21px;
            font-size: 19px;
            display: inline-flex;
            align-items: center;
            .food-info-price_original {
              text-decoration: line-through;
              font-size: 13px;
              color: #888;
              margin-right: 7px;
            }
          }
        }
        .food-info-type,
        .food-info-num {
          color: #888;
          margin: 3px 0;
          font-size: 13px;
        }
      }
    }
  }
  .food-fee {
    padding: 0.3rem 0;
    > div {
      justify-content: space-between;
      display: flex;
      padding: 5px 0;

      .food-fee-price {
        font-weight: 600;
      }
    }
  }
  .food-pay {
    text-align: right;
    font-size: 14px;
    border-top: 1px solid #e6e5e5;
    padding: 10px 0;
    .food-pay-discount {
      color: #ff0000b0;
      font-size: 16px;
      font-style: normal;
      margin-right: 8px;
    }
    .food-pay-total {
      color: red;
      font-style: normal;
      font-size: 20px;
    }
  }
}
.order-pay-note {
  background-color: #fff;
  padding: 10px 0 10px 20px;
  font-size: 15px;
  margin: 5px 3px 0;
  .order-pay-note-item {
    position: relative;
    font-size: 15px;
    padding: 10px 0;
    .note-item-right-box {
      padding-right: 25px;
      i {
        position: absolute;
        right: 5px;
      }
      .note-item-right {
        overflow: hidden;
        max-width: 250px;
        text-align: right;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
.footer-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1.2rem;
  .footer-box-left {
    width: 70%;
    background-color: #000;
    padding: 0 30px;
    align-items: center;
    justify-content: flex-end;
    color: #fff;

    .footer-left_total {
      font-size: 20px;
      font-style: normal;
    }
  }
  .footer-box-right {
    width: 30%;
    line-height: 1.2rem;
    background-color: $mt-color;
    text-align: center;
  }
}
.box-right-arrow {
  position: relative;
  padding-right: 30px;
  .icon-xiangyou {
    font-size: 13px;
    font-weight: 700;

    color: #d4d4d4;
    &.right {
      transform: translateY(-50%);
      right: 10px;
      position: absolute;
      top: 50%;
    }
  }
}
.pay-way-box {
  padding: 5px 10px;
  p {
    font-size: 15px;
    padding: 5px 0;
    &:first-child {
      border-bottom: 1px solid #b1adad4f;
    }
  }
}
.remark-box {
  text-align: center;

  .save-btn {
    color: $mt-color;
    font-size: 16px;
  }
  .content {
    width: 90%;
    margin: 10px auto;
    background-color: #fdfafa;
    border: 1px solid $mt-light-gray;
  }
}
.address-list-box {
  .list-box-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 5px 15px;
    .content {
      padding-left: 15px;
      flex: 1;
      .address {
        font-weight: 600;
        font-size: 17px;
        margin-bottom: 5px;
        .tag {
          font-size: 12px;
          font-weight: normal;
          margin-left: 15px;
          padding: 5px 7px;
          vertical-align: middle;
          display: inline-block;
          transform: scale(0.8);
          &.company {
            color: $mt-address-company;
            background-color: $mt-address-company-bg;
          }
          &.school {
            color: $mt-address-school;
            background-color: $mt-address-school-bg;
          }
          &.home {
            color: $mt-color;
            background-color: $mt-light-color;
          }
        }
      }
      .person {
        .name {
          margin-right: 15px;
        }
      }
    }
  }
}
</style>
<style rel="stylesheet/scss" lang="scss">
.order-pay .van-popup--right {
  width: 100%;
  height: 100%;
}

.address-list .pop-up-bottom i {
  color: $mt-color;
}
</style>
