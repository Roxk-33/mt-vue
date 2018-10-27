<template>
  <div class='shop-catalog'>
    <header-nav :is-back="true" :title="headerTitle" :onLeft="true" @click-left="$router.push('/user/index');"></header-nav>
    <div class='filter-box mt-flex-space-between'>
      <div class="filter-box-content" v-click-outside="closeEvent">
        <span class='sort-target' @click="dialogVisible = true" :class="{ 'sort-target_bold' : (sortTarget !== 'sale' &&  sortTarget !== 'distance')}">
          {{sortText | sortI18n}}
          <i :class="{'fa fa-angle-down' : !dialogVisible,'fa fa-angle-up' : dialogVisible}"></i>
        </span>
        <span class='sort-target sort-target_small' @click="selectSortType('sale')" :class="{ 'sort-target_bold' : sortTarget === 'sale' }">销量</span>
        <span class='sort-target sort-target_small' @click="selectSortType('distance')" :class="{ 'sort-target_bold' : sortTarget === 'distance' }">距离</span>

        <transition name="slide-fade">
          <div class='sort-box' v-if='dialogVisible'>
            <p @click="selectSortType('complex')" :class="{ 'sort-target_selected' : sortTarget === 'complex' }">
              综合排序
            </p>
            <p @click="selectSortType('speed')" :class="{ 'sort-target_selected' : sortTarget === 'speed' }">
              速度最快
            </p>
            <p @click="selectSortType('rate')" :class="{ 'sort-target_selected' : sortTarget === 'rate' }">
              评分最高
            </p>
            <p @click="selectSortType('threshold')" :class="{ 'sort-target_selected' : sortTarget === 'threshold' }">起送价最低</p>
            <p @click="selectSortType('freight')" :class="{ 'sort-target_selected' : sortTarget === 'freight' }">配送费最低</p>
            <p @click="selectSortType('perCapitaDec')" :class="{ 'sort-target_selected' : sortTarget === 'perCapitaDec' }">人均高到低</p>
            <p @click="selectSortType('perCapitaAsc')" :class="{ 'sort-target_selected' : sortTarget === 'perCapitaAsc' }">人均低到高</p>
          </div>
        </transition>
      </div>
      <div class="filter-box-content filter-box-content_right">
        筛选
        <i class='fa fa-bars' style="margin-left:5px;"></i>
      </div>
    </div>
    <div class="shop-list">
      <van-list v-model="loading" :finished="finished" @load="onPullingUp">
        <van-cell v-for="(shop,index) in shopList" :key='index' style="padding:10px">
          <router-link class='shop-item' :to="{ name: 'shopDetail', params: { shopId: shop.shop_id }}">
            <div class='shop-item_left'>
              <img :src='shop.photo'>
            </div>
            <div class='shop-item_right'>
              <p class='shop-title'>{{shop.shop_title}}</p>
              <div class='shop-basedata'>
                <div class='double-box'>
                  <div class='sale-data'>
                    <div class='sale-data-item sale-data-stars'>
                      <rate :rateValue="shop.rate"></rate>
                    </div>
                    <div class='sale-data-item' style="text-align:right;">
                      月售
                      <i>{{shop.sales}}</i>
                    </div>
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
      </van-list>

    </div>
  </div>
</template>

<script >
import { fetchShopList } from '@/api/shop';
import Scroll from '@/views/dumb/scroll/index';
import Rate from '@/views/dumb/rate';
import headerNav from '@/views/dumb/header-nav';

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
      sortText: 'complex',
      dialogVisible: false, // 排序框
      page: 1,
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
  },
  methods: {
    getList() {
      fetchShopList({ page: this.page, type: this.sortTarget }).then(resp => {
        this.loading = false;
        this.shopList = this.shopList.concat(resp.data.list);
      });
    },
    onPullingUp() {
      this.loading = true;
      this.getList();
    },
    selectSortType(type) {
      this.sortTarget = type;
      if (!(type === 'sale' || type === 'distance')) {
        this.sortText = type;
        this.dialogVisible = !this.dialogVisible;
      } else {
        this.sortText = 'complex';
        this.dialogVisible = false;
      }

      this.getList();
    },
    closeEvent() {
      this.dialogVisible = false;
    },
  },
  created() {},

  filters: {
    sortI18n(value) {
      switch (value) {
        case 'complex':
          return '综合排序';
        case 'speed':
          return '速度最快';
        case 'rate':
          return '评分最高';
        case 'threshold':
          return '起送价最低';
        case 'freight':
          return '配送费最低';
        case 'perCapitaDec':
          return '人均高到低';
        case 'perCapitaAsc':
          return '人均低到高';
        default:
          return this.sortI18n;
      }
    },
  },
};
</script>

<style  rel="stylesheet/scss" lang="scss">
.filter-box {
  background-color: white;
  height: 40px;
  padding: 2px 10px;
  box-sizing: border-box;
  position: relative;
  align-items: center;
  .filter-box-content {
    text-align: left;
    padding-left: 0.5rem;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    font-size: 12px;
    color: rgb(165, 164, 164);
  }
  .sort-target {
    margin-right: 5px;
    &:first-child {
      width: 80px;
      display: inline-block;
      color: black;
    }
    &.sort-target_bold {
      font-weight: 600;
      color: black;
    }
  }
  .sort-box {
    position: absolute;
    width: 100%;
    text-align: left;
    padding-left: 20px;
    font-size: 13px;
    left: -2px;
    top: 0;
    z-index: 999;
    margin-top: 35px;
    background-color: white;
    color: black;
    .sort-target_selected {
      color: #ffd161;
      font-weight: 700;
    }
  }
}
.shop-list {
  background-color: white;
  min-height: 42rem;
  position: relative;
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
    }
    .shop-title {
      font-weight: 700;
      text-align: left;
      margin-bottom: 10px;
      margin-top: 0;
      font-size: 17px;
      color: black;
    }
    .double-box {
      display: flex;
      justify-content: space-around;
    }
    .sale-data {
      display: inline-block;
      width: 60%;
      .sale-data-item {
        width: 40%;
        float: left;
        line-height: 18px;
      }
      .sale-data-stars {
        width: 55%;
        height: 100%;
        margin-right: 5px;
        // background-color: red;
      }
    }

    .logistics-data {
      display: inline-block;
      width: 46%;
      line-height: 19px;
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
