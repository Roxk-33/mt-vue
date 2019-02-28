<template>
  <div class="order-review-detail">
    <header-nav
      title="我的评价"
      :left-click="true"
      @left-click-fn="close"
      :border="false"
      headerbgColor="#f8f8f8"
    />
    <div class="review-box">
      <div class="shop-info">
        <img class="info-avatar" :src="shopInfo.photo" />
        <p class="info-detail">{{ shopInfo.shop_title }}</p>
      </div>
      <div class="review-star">
        <rate v-model="reviewInfo.rate" :size="30" :is-show-text="false" />
        <p class="review-title">"{{ reviewInfo.rate | starText }}"</p>
      </div>
      <div class="other-star">
        <div class="other-star-item">
          <span>包装</span>
          <rate
            v-model="reviewInfo.packing_rate"
            :size="17"
            :is-show-text="false"
          />
          <span class="review-title">{{
            reviewInfo.packing_rate | starText
          }}</span>
        </div>
        <div class="other-star-item">
          <span>味道</span>
          <rate
            v-model="reviewInfo.taste_rate"
            :size="17"
            :is-show-text="false"
          />
          <span class="review-title">{{
            reviewInfo.taste_rate | starText
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import headerNav from "@/views/dumb/header-nav";
import Rate from "@/views/dumb/rate";
export default {
  name: "order-review-detail",
  props: {
    shopInfo: Object,
    reviewInfo: Object
  },
  components: {
    Rate,
    headerNav
  },
  methods: {
    close() {
      this.$emit("close");
    }
  },
  filters: {
    parseTime(val, cFormat = null) {
      let time = parseTime(val, cFormat);
      return time;
    },
    starText(val) {
      switch (val) {
        case 1:
          return "很差";
        case 2:
          return "一般";
        case 3:
          return "满意";
        case 4:
          return "非常满意";
        case 5:
          return "无可挑剔";
        default:
          return "";
      }
    }
  }
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.order-review-detail {
  .review-box {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    background-color: #fff;
    margin: 5px 10px;
    padding: 8px;
  }
  .shop-info {
    padding-bottom: 5px;
    text-align: left;
    .info-avatar {
      display: inline-block;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      vertical-align: middle;
    }
    .info-detail {
      display: inline-block;
      font-size: 15px;
      vertical-align: middle;
      margin-left: 8px;
    }
  }

  .review-star {
    .review-title {
      text-align: center;
      font-size: 16px;
      color: $mt-color;
      margin-top: 5px;
    }
    .rate {
      margin-top: 10px;
      text-align: center;
    }
  }
  .other-star {
    padding: 8px 0;
    margin-top: 16px;
    .other-star-item {
      width: 75%;
      margin: 4px auto;
      line-height: 17px;
      .rate {
        margin-left: 10px;
        display: inline-block;
      }

      .review-title {
        color: $mt-color;
        margin-left: 7px;
      }
    }
  }
}
</style>
<style rel="stylesheet/scss" lang="scss">
.van-popup {
  background-color: $mt-light-gray;
}
</style>
