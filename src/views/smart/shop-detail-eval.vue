<template>
  <div class="shop-detail-eval">
    <!-- <div class="shop-eval-box">
      <div class="left">
        <div class="shop-total-eval">
          <p class="rate">4.7</p>
          <p class="label">商家评分</p>
        </div>
        <div class="shop-star-eval mt-flex-space-between">
          <div class="block">
            <span class="label">口味</span>
            <rate
              v-model="rate"
              :size="10"
              :margin-left="2"
            />
          </div>
          <div class="block">
            <span class="label">包装</span>
            <rate
              v-model="rate"
              :size="10"
              :margin-left="2"
            />
          </div>
        </div>
      </div>
      <div class="right">
        <p class="satisfactory-data">100%</p>
        <p class="label">配送满意度</p>
      </div>
    </div> -->
    <div class="user-eval-box">
      <div class="user-eval-item" v-for="item in reviewList" :key="item.id">
        <div class="user-eval-item-top mt-flex-space-between">
          <div class="user-info mt-flex-space-between">
            <img :src="item.user_info.avatar" class="user-avatar" />
            <div>
              <p class="user-name">{{ item.user_info.user_name }}</p>
              <span class="label">评分</span>
              <rate
                v-model="item.rate"
                :size="10"
                :margin-left="2"
                :isShowText="false"
              />
            </div>
          </div>
          <span class="eval-time">{{
            item.created_at | parseTime("{y}.{m}.{d}")
          }}</span>
        </div>
        <div class="user-eval-content" v-if="item.remarks.length">
          {{ item.remarks }}
        </div>
      </div>
    </div>
    <p class="empty-slogan" v-if="isEmpty">暂无评价</p>
  </div>
</template>

<script type="text/ecmascript-6">
import Rate from "@/views/dumb/rate";
import { parseTime } from "@/common/utils";
export default {
  name: "shop-detail-eval",

  data() {
    return {
      rate: 3,
      page: 0,
      isEmpty: false,
      reviewList: []
    };
  },
  props: {
    shopId: String
  },
  components: {
    Rate
  },
  methods: {
    getList() {
      this.$store
        .dispatch("shop/getShopReviewList", {
          page: this.page,
          shopId: this.shopId
        })
        .then(resp => {
          this.mtLoading = false;

          if (resp.data.length === 0 && this.page === 0) {
            this.finished = true;
            this.reviewList = [];
            this.isEmpty = true;
            return;
          }
          if (this.page === 0) {
            this.reviewList = resp.data;
          } else {
            this.reviewList = this.reviewList.concat(resp.data);
          }
          this.page++;
        })

        .catch(err => {
          this.$toast(err);
          this.mtLoading = false;
          console.log(err);
        });
    }
  },
  mounted() {
    this.getList();
  },
  filters: {
    parseTime(val, cFormat = null) {
      let time = parseTime(val, cFormat);
      return time;
    }
  }
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.shop-detail-eval {
  .shop-eval-box {
    background-color: #fff;
    margin-bottom: 5px;
    display: flex;
    justify-content: flex-start;
    padding: 9px 12px;
    .left {
      width: 70%;
      display: flex;
      border-right: 1px solid $mt-light-gray;
      .shop-total-eval {
        text-align: center;
        margin-right: 20px;
        .label {
          color: $mt-gray;
          margin-top: 5px;
        }
        .rate {
          color: $mt-color;
          font-size: 25px;
        }
      }
      .shop-star-eval {
        flex-direction: column;
        padding: 5px 0;
        .rate {
          display: inline-block;
          .score {
            color: $mt-color;
          }
        }
        .label {
          margin-right: 5px;
          color: $mt-gray;
        }
      }
    }
    .right {
      width: 30%;
      color: $mt-gray;
      margin-left: 10px;
      padding-left: 10px;
      .satisfactory-data {
        font-size: 25px;
      }
      .label {
        margin-top: 5px;
      }
    }
  }
  .user-eval-box {
    .user-eval-item {
      padding: 10px;
      border-bottom: 1px solid $mt-light-gray;
      .user-eval-item-top {
        .user-info {
          align-items: center;
          .user-avatar {
            border-radius: 50%;
            width: 30px;
            height: 30px;
            margin-right: 8px;
          }
          .user-name {
            font-size: 14px;
            margin-bottom: 5px;
          }
          .label {
            color: $mt-gray;
          }
          .rate {
            display: inline-block;
          }
        }
        .eval-time {
          color: $mt-gray;
        }
      }
      .user-eval-content {
        margin-top: 10px;
        padding: 0 10px 0 37px;
      }
    }
  }
  .empty-slogan {
    font-size: 18px;
    text-align: center;
    margin-top: 20px;
  }
}
</style>
<style>
.shop-star-eval .rate .score {
  color: #eea900;
}
</style>
