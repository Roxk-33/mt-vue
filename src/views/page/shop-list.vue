<template>
  <div class="shop-category">
    <header-nav :title="headerTitle" :back-router="backRouter" />
    <shop-list-header
      :sort-target="sortTarget"
      @change="changeFilter"
      @showMask="showMask"
      v-if="false"
    />

    <div class="shop-list">
      <mt-mask :visible="show" />
      <mt-better-scroll
        ref="contentScroll"
        :data="shopList"
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp"
      >
        <van-cell
          v-for="(shop, index) in shopList"
          :key="index"
          style="padding:10px"
        >
          <shop-list-item :shopInfo="shop"></shop-list-item>
        </van-cell>
      </mt-better-scroll>
      <list-empty :isShow="finished" />
    </div>
    <to-cart-list />
  </div>
</template>

<script >
import headerNav from "@/views/dumb/header-nav";
import shopListHeader from "@/views/smart/shop-list-header";
import shopListItem from "@/views/smart/shop-list-item";
import toCartList from "@/views/smart/to-cart-list";
import mtMask from "@/views/dumb/mt-mask";
import listEmpty from "@/views/dumb/list-empty";
import MtBetterScroll from "@/views/dumb/mt-better-scroll";
import { getLocation } from "@/common/map";

export default {
  name: "shop-list",
  data() {
    return {
      loading: false,
      finished: false,
      rate: 3.5,
      shopList: [],
      headerTitle: "美食",
      sortTarget: "complex",
      page: 1,
      show: false,
      pullUpLoad: {
        threshold: 10,
        txt: { more: "", noMore: "暂无更多数据" }
      },
      backRouter: {
        name: "userIndex"
      }
    };
  },
  components: {
    headerNav,
    shopListHeader,
    shopListItem,
    mtMask,
    toCartList,
    listEmpty,
    MtBetterScroll
  },
  methods: {
    // 点击排序框时，显示店铺列表遮罩层
    showMask(result) {
      this.show = result;
    },
    getList() {
      this.$store
        .dispatch("shop/getShopList", {
          page: this.page,
          type: this.sortTarget,
          total: this.shopList.length,
          ...this.location
        })
        .then(resp => {
          this.mtLoading = false;

          if (resp.data.length === 0) {
            this.page === 0 && (this.finished = true);
            return this.$toast("附近已无门店");
          }

          if (this.page === 0) {
            this.shopList = resp.data;
          } else {
            this.shopList = this.shopList.concat(resp.data);
          }
          this.page++;
        })

        .catch(err => {
          this.$toast(err);
          this.mtLoading = false;
          console.log(err);
        });
    },
    onPullingDown() {
      this.page = 1;
      this.getList();
    },
    onPullingUp() {
      // this.loading = true;
      this.getList();
    },
    changeFilter(type) {
      this.sortTarget = type;
    }
  },
  computed: {
    location() {
      return this.$store.state.user.location;
    }
  },
  created() {
    if (!this.location) {
      this.timers = setInterval(() => {
        if (this.location) {
          this.getList();
          this.timers && clearInterval(this.timers);
        }
      }, 200);
    } else {
      this.getList();
    }
  }
};
</script>

<style  rel="stylesheet/scss" lang="scss">
.shop-category {
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
.better-scroll-list-wrapper {
  padding-bottom: 50px;
}
</style>
