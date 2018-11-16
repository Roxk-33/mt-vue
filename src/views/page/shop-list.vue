<template>
  <div class='shop-catalog'>
    <header-nav :is-back="true" :title="headerTitle" :onLeft="true" @click-left="$router.push('/user/index');"></header-nav>
    <shop-list-header :sortTarget="sortTarget" @change="changeFilter" @showMask="showMask"></shop-list-header>
    <div class="shop-list">
      <mt-mask v-model="show"></mt-mask>
      <van-list v-model="loading" :finished="finished" @load="onPullingUp" :immediate-check="false">
        <van-cell v-for="(shop,index) in shopList" :key='index' style="padding:10px">
          <router-link class='shop-item' :to="{ name: 'shopDetail', params: { shopId: shop.id }}">
            <div class='shop-item_left'>
              <img :src='shop.photo'>
            </div>
            <div class='shop-item_right'>
              <p class='shop-title'>{{shop.shop_title}}</p>
              <div class='shop-basedata'>
                <div class='mt-flex-space-between'>
                  <div class='sale-data-stars'>
                    <rate v-model="shop.rate" :size="10" :marginLeft="2"></rate>
                  </div>
                  <div class='sale-data-volume'>
                    月售
                    <i>{{shop.total_sales}}</i>
                  </div>
                  <div class='logistics-data'>
                    <span class='logistics-data-item'>
                      <i>{{shop.transportTime}}</i>分钟
                    </span>
                    <span class='logistics-data-item'>
                      <i>{{shop.distance}}</i>Km
                    </span>
                  </div>
                </div>
                <div class='price-data'>
                  <span class='price-data-item'>
                    起送￥
                    <i>{{shop.threshold}}</i>
                  </span>
                  <span class='price-data-item'>
                    配送￥
                    <i>{{shop.freight}}</i>
                  </span>
                  <span class='price-data-item'>
                    人均￥
                    <i>{{shop.perCapita}}</i>
                  </span>
                </div>
              </div>
            </div>
          </router-link>
        </van-cell>
        <van-cell v-if="shopList.length === 0" class="list-empty">
          <p>没有数据</p>
        </van-cell>
      </van-list>
    </div>
    <to-cart-list></to-cart-list>
  </div>
</template>

<script >
import Scroll from '@/views/dumb/scroll';
import Rate from '@/views/dumb/rate';
import headerNav from '@/views/dumb/header-nav';
import shopListHeader from '@/views/smart/shop-list-header';
import toCartList from '@/views/smart/to-cart-list';
import mtMask from '@/views/dumb/mt-mask';

export default {
  name: 'shopList',
  data() {
    return {
      loading: false,
      finished: false,
      rate: 3.5,
      shopList: [],
      headerTitle: '美食',
      sortTarget: 'complex',
      page: 1,
      show: false,
      pullUpLoad: {
        threshold: 10,
        txt: { more: '', noMore: '暂无更多数据' },
      },
    };
  },
  components: {
    Scroll,
    Rate,
    headerNav,
    shopListHeader,
    mtMask,
    toCartList,
  },
  methods: {
    // 点击排序框时，显示店铺列表遮罩层
    showMask(result) {
      this.show = result;
    },
    getList() {
      this.$store
        .dispatch('shop/getShopList', {
          page: this.page,
          type: this.sortTarget,
        })
        .then(resp => {
          this.loading = false;
          this.shopList = this.shopList.concat(resp.data);
        })
        .catch(err => {
          this.$toast(err);
          console.log(err);
        });
    },
    onPullingUp() {
      // this.loading = true;
      this.getList();
    },
    changeFilter(type) {
      this.sortTarget = type;
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style  rel="stylesheet/scss" lang="scss">
@import '~css/common';
.shop-catalog {
  height: 100%;
  min-height: 100%;
}
.shop-list {
  background-color: white;
  // min-height: 42rem;
  height: 100%;
  position: relative;

  .mt-modal {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  i {
    font-style: normal;
  }
  .shop-loadding {
    background-color: rgba(0, 0, 0, 0.8);
    transition: opacity 0.3s;
    position: absolute;
    z-index: 2;
    margin: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0.7;
    margin-top: 2rem;
  }

  .list-content {
    padding: 0;
  }
  .shop-item {
    margin-bottom: 10px;
    justify-content: flex-start;
    display: flex;
  }

  .shop-item_left {
    width: 29%;
    line-height: 3rem;
    height: 2rem;
    img {
      width: 95%;
      height: 75px;
    }
  }
  .shop-item_right {
    width: 71%;

    .shop-basedata {
      font-size: 12px;
      color: gray;
      & > div {
        height: 20px;
      }
      text-align: left;
      .sale-data-volume {
        font-weight: 900;
        color: #000;
      }
    }
    .shop-title {
      font-weight: 700;
      text-align: left;
      margin-bottom: 10px;
      margin-top: 0;
      font-size: 17px;
      color: black;
    }

    .sale-data {
      .sale-data-item {
        display: inline-block;
        line-height: 18px;
      }
      .sale-data-stars {
        width: 60%;
        height: 100%;
        margin-right: 5px;
        .rate {
          white-space: nowrap;
        }
        // background-color: red;
      }
    }

    .logistics-data {
      text-align: right;
    }

    .price-data {
      width: 100%;
      text-align: left;
    }

    .price-data-item,
    .logistics-data-item {
      padding: 2px;
      border-right: 1px solid rgba(128, 128, 128, 0.247);

      &:last-child {
        border: 0;
      }

      i {
        padding-right: 1px;
      }
    }
  }

  .el-rate__icon {
    font-size: 5px;
    margin-right: 2px;
  }
  .el-rate__text {
    margin-left: 5px;
  }
}
</style>
