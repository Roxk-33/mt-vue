<template>
  <div class="order-eval-detail">
    <div class="top">
      <div class="info">
        <img class="info-avatar" :src="shopInfo.photo" />
        <div class="info-detail">
          <p>
            {{ shopInfo.shop_title }}
          </p>
        </div>
      </div>
    </div>
    <div class="evaluation-star">
      <p class="evaluation-title">"{{ reviewInfo.rate | starText }}"</p>
      <rate v-model="reviewInfo.rate" :size="30" :is-show-text="false" />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Rate from "@/views/dumb/rate";
export default {
  name: "order-eval-detail",
  props: {
    shopInfo: Object,
    reviewInfo: Object
  },
  components: {
    Rate
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
.order-eval-detail {
  text-align: center;

  .top {
    padding-bottom: 5px;
    text-align: left;
    // border-bottom: 1px solid $mt-light-gray;

    .info {
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
  }
  .evaluation-title {
    text-align: center;
    font-size: 17px;
    margin-top: 5px;
  }
  .rate {
    margin-top: 10px;
    text-align: center;
  }
}
</style>
