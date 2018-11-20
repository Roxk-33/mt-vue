<template>
  <div class="order-pay">
    <header-nav :title="headerTitle" :onLeft="true" @click-left="$router.back(-1);"></header-nav>
    <div class='order-pay-header'>
      <div class='header-address box-right-arrow ' @click="showAddress = true">
        <p class='address-content' v-if="orderInfo.address.address">{{orderInfo.address.address}}</p>
        <span class='address-person' v-if="orderInfo.address.user_name">{{orderInfo.address.user_name}} {{orderInfo.address.tel}}</span>
        <p v-else class="address-select">请选择地址</p>
        <i class='iconfont icon-xiangyou right'></i>
      </div>
      <div class='header-shipping-time box-right-arrow mt-flex-space-between'>
        <span class='shipping-type'>立即送出</span>
        <!-- 送达时间暂时定为当前时间后15分钟 -->
        <span class='shipping-time'>大约{{orderInfo.arrivalTime.substr(-5)}}送达</span>
        <i class='iconfont icon-xiangyou right'></i>
      </div>
    </div>
    <div class='order-pay-main'>
      <div class='main-header order-pay-main-item'>
        <span>{{shopInfo.shop_title}}</span>
      </div>
      <ul class='main-food-list order-pay-main-item'>
        <li class='food-list-item' v-for="item in foodList" :key="item.id">
          <div class='food-pic'>
            <img :src="item.picture">
          </div>
          <!-- TODO:样式实现较差，需要优化 -->
          <div class='food-info'>
            <div class='food-info-main mt-flex-space-between'>
              <div class='food-info-name'>
                {{item.food_name}}
                <!-- <span class='food-info-discount'>折</span> -->
              </div>
              <div class='food-info-price'>
                <!-- <span class='food-info-price_original'>￥64</span> -->
                ￥{{item.price}}
              </div>
            </div>
            <!-- 规格 -->
            <p class='food-info-type'>{{item.spec_text.join(',')}}</p>
            <p class='food-info-num'>x{{item.num}}</p>
          </div>
        </li>
      </ul>
      <div class='food-fee'>
        <div>
          <span class='food-fee-title'>包装费</span>
          <span class='food-fee-price'>￥16</span>
        </div>
        <div>
          <span class='food-fee-title'>配送费</span>
          <span class='food-fee-price'>￥{{shopInfo.freight}}</span>
        </div>
      </div>
      <div class='food-pay'>
        <!-- <span>已优惠
          <i class='food-pay-discount'>￥21.2</i>
        </span> -->
        <span>小计
          <i class='food-pay-total'>￥{{totalPrice}}</i>
        </span>
      </div>

    </div>
    <div class='order-pay-note'>
      <div class='order-pay-note-item box-right-arrow mt-flex-space-between' @click="showRemarks = true;tempRemarks = orderInfo.remarks;">
        <span class='note-item-left'>备注</span>
        <div>
          <span class='note-item-right'>{{orderInfo.remarks}}</span>
          <i class='iconfont icon-xiangyou'></i>
        </div>

      </div>
      <div class='order-pay-note-item box-right-arrow mt-flex-space-between'>
        <span class='note-item-left'>餐具数量</span>
        <div>
          <span class='note-item-right'>1人</span>
          <i class='iconfont icon-xiangyou'></i>
        </div>

      </div>
      <div class='order-pay-note-item box-right-arrow mt-flex-space-between'>
        <span class='note-item-left'>发票</span>
        <span class='note-item-right'></span>
        <i class='iconfont icon-xiangyou'></i>

      </div>
      <div class='order-pay-note-item box-right-arrow mt-flex-space-between'>
        <span class='note-item-left'>支付方式</span>
        <span class='note-item-right'>在线支付</span>
        <!-- <i class='iconfont icon-xiangyou'></i> -->
      </div>
    </div>

    <div class='footer-box mt-flex-space-between'>
      <div class='footer-box-left mt-flex-space-between'>
        <!-- <span class='footer-left_discount'>
          已优惠￥40.4
        </span> -->
        <span class='footer-left_total'>
          合计￥
          <i>{{totalPrice}}</i>
        </span>
      </div>
      <div class='footer-box-right' @click="sumbitOrder">
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
    <!-- 收货地址 -->
    <van-popup v-model="showAddress" position="bottom" :overlay="true">
      <pop-up class="address-list" @cancel="cancel('address')" @clickHeaderLeft="cancel('address')" headerTitle="选择收货地址" header-left="取消" bottomText="新增收货地址" bottomTextIcon="icon-add_icon">
        <div class="address-list-box">
          <ul class="list-box">
            <li class="list-box-item" v-for="(item,index) in addressList" :key="item.id" @click="selAddress(index)">
              <van-radio :name="true" v-model="item.selected" @click="selAddress(index)" :checkedColor="mtColor"></van-radio>
              <div class="content">
                <div class="address">{{item.address}}
                  <div class="tag" v-if="item.tag !== ''" :class="{'school':item.tag == 0,'company':item.tag == 1,'home' :item.tag == 2}">
                    {{TAGS[item.tag]}}
                  </div>
                </div>
                <p class="person"><span class="name">{{item.user_name}}</span><span>{{item.tel}}</span></p>
              </div>
              <div class="edit-icon">
                <i class="iconfont icon-xiugai1"></i>
              </div>
            </li>
          </ul>
        </div>
      </pop-up>
    </van-popup>
    <!-- 备注 -->
    <van-popup v-model="showRemarks" position="right" :overlay="false">
      <div class="remark-box">
        <div class="remark-box-header mt-flex-space-between">
          <i class="iconfont icon-xiangzuo" @click="showRemarks = false"></i>
          <span class="title">添加备注</span>
          <span @click="saveRemarks" class="save-btn">完成</span>
        </div>
        <textarea class="content" v-model="tempRemarks">
        </textarea>
      </div>
    </van-popup>
  </div>
</template>

<script type="text/ecmascript-6">
import popUp from 'src/views/dumb/pop-up';
import CONSTANT from 'src/common/constant';
import headerNav from 'src/views/dumb/header-nav';
import { getTime } from 'src/common/utils';

export default {
  name: 'order-pay',

  data() {
    return {
      headerTitle: '提交订单',
      SEX: CONSTANT.TYPE.SEX_EN,
      TAGS: CONSTANT.TYPE.TAGS,
      mtColor: CONSTANT.COLOR.MT,
      showPay: false,
      showRemarks: false,
      showAddress: false,
      foodList: [],
      addressList: [],
      shopInfo: {},
      tempRemarks: '',
      orderInfo: {
        address: {},
        remarks: '',
        shopId: this.shopId,
        arrivalTime: getTime(),
      },
    };
  },
  components: {
    popUp,
    headerNav,
  },

  created() {
    if (!this.shopId) {
      this.$toast('非法操作！');
      this.$router.push({ name: 'userIndex' });
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.mtLoading = true;

      this.$store
        .dispatch('user/getAddressList')
        .then((resp) => {
          this.mtLoading = false;
          this.addressList = this.addressList.concat(resp.data);
          this.getDefaultAddress();
        })
        .catch((e) => {
          this.router.push('/error');
          this.$toast(e);
        });

      this.$store
        .dispatch('cart/getCartListByShop', { shopId: this.shopId })
        .then((resp) => {
          this.mtLoading = false;

          if (this.foodIdArr.length) {
            this.foodList = resp.data.filter(
              item => this.foodIdArr.indexOf(item.id) !== -1,
            );
          } else {
            this.foodList = resp.data;
          }
          this.shopInfo = this.foodList[0].shop_info;
        })
        .catch((e) => {
          this.router.push('/error');
          this.$toast(e);
        });
    },
    // 获取默认地址
    getDefaultAddress() {
      this.addressList.forEach((item) => {
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
      this.cancel('address');
    },
    cancel(type) {
      switch (type) {
        case 'address':
          this.showAddress = false;
          break;
        case 'pay':
          this.showPay = false;
          break;
        case 'remarks':
          this.showRemarks = false;
          break;
      }
    },
    saveRemarks() {
      this.orderInfo.remarks = this.tempRemarks;
      this.cancel('remarks');
    },
    sumbitOrder() {
      if (!this.orderInfo.address.address) {
        return this.$toast('请选择地址');
      }
      this.orderInfo.cartIdArr = this.foodIdArr;
      this.orderInfo.shopId = this.shopId;
      this.$store
        .dispatch('order/sumbitOrder', this.orderInfo)
        .then((resp) => {
          this.$router.push({
            name: 'orderPay',
            params: { orderId: resp.data.id },
          });
          // 重新获取购物车
          this.$store.dispatch('cart/getCartList');
        })
        .catch((err) => {
          console.log(err);
          this.$toast(err);
        });
    },
  },
  computed: {
    totalPrice() {
      if (this.foodList.length === 0) return 0;
      return this.foodList.reduce(
        (previous, current) => (previous += current.price * current.num),
        0,
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
    },
  },
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
@import '~css/common';

.order-pay {
  padding: 0 5px 50px;
}
.order-pay-header {
  border-radius: 5px;
  background-color: #fff;
  margin-bottom: 5px;
  margin-top: 5px;
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
  border-radius: 5px;
  background-color: #fff;
  padding: 5px 20px;
  font-size: 15px;
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
  border-radius: 5px;
  background-color: #fff;
  padding: 10px 0 10px 20px;
  font-size: 15px;
  margin-top: 5px;
  .order-pay-note-item {
    position: relative;
    font-size: 15px;
    padding: 10px 0;
    .note-item-right {
      margin-right: 5px;
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
    background-color: #fff;
    padding: 0 30px;
    align-items: center;
    > span {
      line-height: 1.2rem;
    }
    .footer-left_total i {
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
  .remark-box-header {
    margin-bottom: 10px;
    padding: 0 5px;
    line-height: 30px;
    .title {
      font-size: 18px;
    }
    .save-btn {
      color: $mt-color;
      font-size: 16px;
    }
  }
  .content {
    width: 90%;
    height: 80px;
    margin: 10px auto;
    background-color: #d1cece3d;
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
@import '~css/common';

.order-pay .van-popup--right {
  width: 100%;
  height: 100%;
}

.address-list .pop-up-bottom i {
  color: $mt-color;
}
</style>
