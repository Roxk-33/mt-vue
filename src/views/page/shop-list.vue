<template>
  <div class='shop-catalog'>
    <header-nav :is-back="true" :title="headerTitle" :on-left="true" @click-left="$router.push('/user/index');" />
    <shop-list-header :sort-target="sortTarget" @change="changeFilter" @showMask="showMask" />
    <div class="shop-list">
      <mt-mask v-model="show" />
      <van-list v-model="loading" :finished="finished" @load="onPullingUp" :immediate-check="false">
        <van-cell v-for="(shop,index) in shopList" :key='index' style="padding:10px">
          <shop-list-item :shopInfo="shop"></shop-list-item>
        </van-cell>
      </van-list>
      <van-cell v-if="shopList.length === 0" class="list-empty">
        <p>没有数据</p>
      </van-cell>
    </div>
    <to-cart-list />
  </div>
</template>

<script >
import Scroll from '@/views/dumb/scroll';
import headerNav from '@/views/dumb/header-nav';
import shopListHeader from '@/views/smart/shop-list-header';
import shopListItem from '@/views/smart/shop-list-item';
import toCartList from '@/views/smart/to-cart-list';
import mtMask from '@/views/dumb/mt-mask';

export default {
  name: 'shop-list',
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
    headerNav,
    shopListHeader,
    shopListItem,
    mtMask,
    toCartList,
  },
  methods: {
    // 点击排序框时，显示店铺列表遮罩层
    showMask(result) {
      this.show = result;
    },
    getList() {
      this.shopList.length === 0 && (this.mtLoading = true);
      this.$store
        .dispatch('shop/getShopList', {
          page: this.page,
          type: this.sortTarget,
        })
        .then(resp => {
          this.loading = false;
          this.mtLoading = false;

          if (resp.data.length === 0) {
            this.finished = true;
          } else {
            this.shopList = this.shopList.concat(resp.data);
          }
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
}
</style>
