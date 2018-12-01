<template>
  <router-link
    class='shop-item'
    :to="''+shopInfo.id"
    tag="div"
    append
  >
    <div class='shop-item_left'>
      <img v-lazy='shopInfo.photo'>
    </div>
    <div class='shop-item_right'>
      <p class='shop-title'>{{ shopInfo.shop_title }}</p>
      <div class='shop-basedata'>
        <div class='mt-flex-space-between'>
          <div class='sale-data-stars'>
            <rate
              v-model="shopInfo.rate"
              :size="10"
              :margin-left="2"
            />
          </div>
          <div class='sale-data-volume'>
            月售
            <i>{{ shopInfo.total_sales }}</i>
          </div>
          <div class='logistics-data'>
            <span class='logistics-data-item'>
              <i>{{ shopInfo.transportTime }}</i>分钟
            </span>
            <span class='logistics-data-item'>
              <i>{{ shopInfo.distance }}</i>Km
            </span>
          </div>
        </div>
        <div class='price-data'>
          <span class='price-data-item'>
            起送￥
            <i>{{ shopInfo.threshold }}</i>
          </span>
          <span class='price-data-item'>
            配送￥
            <i>{{ shopInfo.freight }}</i>
          </span>
          <span
            class='price-data-item'
            v-if="shopInfo.perCapita"
          >
            人均￥
            <i>{{ shopInfo.perCapita }}</i>
          </span>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script type="text/ecmascript-6">
import Rate from "@/views/dumb/rate";

export default {
  name: "shop-list-item",
  props: {
    shopInfo: Object
  },
  components: {
    Rate
  }
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
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
</style>
