<template>
  <div class="evaluation">
    <header-nav
      :left-click="true"
      headerbg-color="whitesmoke"
      :title="headerTitle"
      :border="false"
      :is-back="false"
      @left-click-fn="close"
    />
    <div class="evaluation-dispatcher evaluation-box">
      <div class="top">
        <div class="info">
          <img
            class="info-avatar"
            src="https://i.loli.net/2018/11/26/5bfb75c197a0c.png"
          />
          <div class="info-detail">
            <p class="distribution-type">美团专送</p>
            <p class="arrival-time">
              {{
                orderStatusTimeArr.complete_time
                  | parseTime("{m}月{d}日{h}:{i}")
              }}左右送达
            </p>
          </div>
        </div>
      </div>
      <div class="evaluation-select" v-if="false">
        <div class="select-box mt-flex-space-around">
          <div
            class="select-box-btn"
            @click="selectSatisfied(false)"
            :class="{ selected: reviewData.isSatisfied === false }"
          >
            <i class="iconfont icon-chaping"></i>
            不满意
          </div>
          <div
            class="select-box-btn"
            @click="selectSatisfied(true)"
            :class="{ selected: reviewData.isSatisfied }"
          >
            <i class="iconfont icon-haoping"></i>
            满意
          </div>
        </div>
        <div
          class="evaluation-detail"
          :class="{
            show: reviewData.isSatisfied === false,
            'show-1': reviewData.isSatisfied
          }"
        >
          <p
            class="evaluation-not-satisfied"
            v-if="reviewData.isSatisfied === false"
          >
            请选择不满意的原因(必选)
          </p>
          <ul
            class="evaluation-detail-list"
            v-if="reviewData.isSatisfied === false"
          >
            <li
              class="evaluation-detail-item"
              v-for="item in evalDispatcherList['not']"
              :key="item.label"
              @click="evalDispatcher(item)"
              :class="{
                selected:
                  reviewData.evalDispatcher.findIndex(
                    _item => _item.value === item.value
                  ) !== -1
              }"
            >
              {{ item.label }}
            </li>
          </ul>
          <ul class="evaluation-detail-list" v-if="reviewData.isSatisfied">
            <li
              class="evaluation-detail-item"
              v-for="item in evalDispatcherList['satisfied']"
              :key="item.label"
              @click="evalDispatcher(item)"
              :class="{
                selected:
                  reviewData.evalDispatcher.findIndex(
                    _item => _item.value === item.value
                  ) !== -1
              }"
            >
              {{ item.label }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="evaluation-shop evaluation-box">
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
        <p class="evaluation-title" v-if="reviewData.evalShopStar > 0">
          "{{ reviewData.evalShopStar | starText }}"
        </p>
        <rate
          v-model="reviewData.evalShopStar"
          :size="30"
          :is-show-text="false"
        />
        <div class="evaluation-star-other" v-if="reviewData.evalShopStar > 0">
          <div class="item">
            <span class="label">口味</span>
            <rate
              v-model="reviewData.evalTasteStar"
              :is-show-text="false"
              :iconArr="iconArr"
              :size="19"
              marginLeft.number="15"
            />
            <span class="text">{{ reviewData.evalTasteStar | starText }}</span>
          </div>
          <div class="item">
            <span class="label">包装</span>
            <rate
              v-model="reviewData.evalPackingStar"
              :is-show-text="false"
              :iconArr="iconArr"
              :size="19"
              marginLeft.number="15"
            />
            <span class="text">{{
              reviewData.evalPackingStar | starText
            }}</span>
          </div>
        </div>
      </div>
      <van-field
        v-model="reviewData.remarks"
        type="textarea"
        class="evaluation-content"
        :placeholder="remaskPlaceholder"
        rows="5"
        :autosize="remaskField"
      />
    </div>
    <div
      class="evaluation-btn"
      :class="{ complete: isComplete }"
      @click="reviewOrder"
    >
      提交
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Rate from "@/views/dumb/rate";
import headerNav from "@/views/dumb/header-nav";
import { parseTime, calTime } from "@/common/utils";

export default {
  name: "userOrderReview",

  data() {
    return {
      headerTitle: "评价",
      remaskPlaceholder: "亲，菜品口味如何，对包装服务等还满意吗？",
      remaskField: { maxHeight: 100, minHeight: 50 },
      iconArr: ["icon-haoping", "icon-chaping"],
      evalDispatcherList: {
        satisfied: [
          {
            label: "快速准时",
            value: 0
          },
          {
            label: "风雨无阻",
            value: 1
          },
          {
            label: "仪表整洁",
            value: 2
          },
          {
            label: "穿戴工服",
            value: 3
          }
        ],
        not: [
          {
            label: "联系沟通困难",
            value: 0
          },
          {
            label: "送错餐",
            value: 1
          },
          {
            label: "送达不通知",
            value: 2
          },
          {
            label: "配送慢",
            value: 3
          }
        ]
      },
      evalShopStar: 0,
      orderInfo: {},
      reviewData: {
        // isSatisfied: "",
        // evalDispatcher: [],
        evalShopStar: 0,
        evalPackingStar: 0,
        evalTasteStar: 0,
        remarks: "",
        distributionType: 0, // 配送类型
        distributionTime: "",
        shopId: null
      }
    };
  },
  components: {
    Rate,
    headerNav
  },
  methods: {
    getData() {
      this.mtLoading = true;
      this.$store
        .dispatch("order/getOrderDetail", this.orderId)
        .then(resp => {
          this.mtLoading = false;
          this.orderInfo = Object.assign({}, resp.data);
          // 计算配送时间
          console.log(this.orderStatusTimeArr);
          this.reviewData.distributionTime =
            calTime(
              this.orderStatusTimeArr.send_time,
              this.orderStatusTimeArr.complete_time
            ) /
            60 /
            1000;
        })
        .catch(err => {
          console.log(err);
          this.mtLoading = false;
          this.$toast(err);
          this.$router.back(-1);
        });
    },
    reviewOrder() {
      if (!this.isComplete) return;
      this.reviewData.shopId = this.shopInfo.id;

      this.$store
        .dispatch("order/reviewOrder", {
          id: this.orderId,
          data: this.reviewData
        })
        .then(resp => {
          this.$toast(resp.message);
          this.$router.push({
            name: "userOrderDetail",
            params: { id: this.orderId }
          });
        })
        .catch(err => {
          console.log(err);
          this.$toast(err);
        });
    },
    evalDispatcher(target) {
      const index = this.reviewData.evalDispatcher.findIndex(
        item => item.value === target.value
      );
      if (index === -1)
        this.reviewData.evalDispatcher.push({
          value: target.value,
          label: target.label
        });
      else this.reviewData.evalDispatcher.splice(index, 1);
    },
    // selectSatisfied(type) {
    //   if (this.reviewData.isSatisfied === type) return;
    //   this.reviewData.isSatisfied = type;
    //   this.reviewData.evalDispatcher = [];
    // },
    close() {
      const oThis = this;
      this.$dialog.alert({
        message: "确定关闭评价？",
        showCancelButton: true,
        cancelButtonText: "关闭评价",
        confirmButtonText: "再想想",
        beforeClose(action, done) {
          if (action === "confirm") {
            done();
          } else {
            oThis.$router.go(-1);
            done();
          }
        }
      });
    }
  },
  mounted() {
    this.getData();
  },
  computed: {
    orderId() {
      return this.$route.params.orderId;
    },
    shopInfo() {
      return this.orderInfo.shop_info || {};
    },
    foodList() {
      if (!this.orderInfo) return {};
      return this.orderInfo.food_list;
    },
    isComplete() {
      if (this.reviewData.isSatisfied === "") return false;
      if (this.reviewData.evalShopStar === 0) return false;
      return true;
    },
    orderStatusTimeArr() {
      if (!!this.orderInfo.order_status) {
        return this.orderInfo.order_status;
      }
      return {};
    }
  },
  filters: {
    parseTime(val, cFormat = null) {
      if (!val) return "";
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
.evaluation {
  min-height: 100%;
  position: relative;
  // padding-bottom: 70px;
  .evaluation-box {
    background-color: white;
    margin: 0 10px 10px;
    padding: 8px;
    .top {
      padding-bottom: 5px;
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
  }
  .evaluation-dispatcher {
    .info-detail {
      .distribution-type {
        margin-bottom: 5px;
      }
      .arrival-time {
        font-size: 12px;
      }
    }
    .evaluation-select {
      .select-box {
        margin: 15px auto;
        .select-box-btn {
          width: 80px;
          border-radius: 15px;
          padding: 6px 0;
          text-align: center;
          border: 1px solid $mt-light-gray;
          i {
            color: #9a9a9a;
          }
          &.selected {
            background-color: $mt-color;
            border-color: $mt-color;
            color: #000;
            i {
              color: #000;
            }
          }
        }
      }

      .evaluation-detail {
        transition: max-height 0.8s;
        max-height: 20px;
        &.show {
          max-height: 500px;
        }
        &.show-1 {
          max-height: 400px;
        }
        .evaluation-not-satisfied {
          text-align: center;
          margin: 5px 0;
        }
        .evaluation-detail-list {
          display: flex;
          flex-wrap: wrap;

          justify-content: space-around;
          .evaluation-detail-item {
            width: 30%;
            text-align: center;
            border: 1px solid $mt-gray;
            margin: 3px 0;
            line-height: 19px;
            &.selected {
              color: $mt-color;
              border-color: $mt-color;
              background-color: #fff2d357;
            }
          }
        }
      }
    }
  }
  .evaluation-shop {
    text-align: center;
    .top {
      text-align: left;
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
    .evaluation-star-other {
      background-color: #f8f8f8;
      padding: 12px 0 12px 25px;
      margin: 5px auto;
      width: 90%;
      .item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        &:last-child {
          margin-top: 12px;
        }
        .rate {
          margin: 0;
          i.selected {
            color: $mt-color;
          }
        }
        .label {
          margin-right: 5px;
          font-size: 14px;
        }
        .text {
          margin-left: 10px;
        }
      }
    }
    .evaluation-content {
      margin: 10px auto;
      background-color: #fdfafa;
      border: 1px solid $mt-light-gray;
    }
  }
  .evaluation-btn {
    height: 60px;
    box-sizing: border-box;
    padding: 20px 0;
    text-align: center;
    font-size: 18px;
    background-color: #dcdcdc;
    color: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    &.complete {
      background-color: $mt-color;
    }
  }
}
</style>
