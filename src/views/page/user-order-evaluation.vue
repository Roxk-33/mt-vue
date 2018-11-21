<template>
  <div class="evaluation">
    <header-nav
      :on-left="true"
      headerbg-color="whitesmoke"
      :border="false"
      :is-back="false"
      :is-close="true"
      @click-left="close"
    />
    <div class="evaluation-person evaluation-box">
      <div class="top">
        <div class="info">
          <img
            class="info-avatar"
            src="https://via.placeholder.com/40x40"
          >
          <div class="info-detail">
            <p>美团专送</p>
            <p>美团专送</p>
          </div>
        </div>
      </div>
      <div class="evaluation-select">
        <div class="select-box mt-flex-space-around">
          <div
            class="select-box-btn"
            @click="selectSatisfied('not')"
            :class="{'selected' : isSatisfied === 'not' }"
          >不满意</div>
          <div
            class="select-box-btn"
            @click="selectSatisfied('satisfied')"
            :class="{'selected' : isSatisfied === 'satisfied' }"
          >满意</div>
        </div>
        <div
          class="evaluation-detail"
          :class="{'show':isSatisfied === 'not','show-1':isSatisfied === 'satisfied'}"
        >
          <p
            class="evaluation-not-satisfied"
            v-if="isSatisfied === 'not'"
          >请选择不满意的原因(必选)</p>
          <ul class="evaluation-detail-list">
            <li
              class="evaluation-detail-item"
              v-for="item in evaPersonList[isSatisfied]"
              :key="item.text"
              @click="evaPerson(item)"
              :class="{'selected':evaPersonSelect.indexOf(item.value) !== -1}"
            >
              {{ item.text }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="evaluation-shop evaluation-box">
      <div class="top">
        <div class="info">
          <img
            class="info-avatar"
            src="https://via.placeholder.com/40x40"
          >
          <div class="info-detail">
            <p>店铺名字</p>
          </div>
        </div>
      </div>
      <div class="evaluation-star">
        <p
          class="evaluation-title"
          v-if="evaShopStar > 0"
        >"{{ evaluationTitle }}"</p>
        <rate
          v-model="evaShopStar"
          :size="30"
          :is-show-text="false"
        />
      </div>
      <textarea
        class="evaluation-content"
        rows="8"
        cols="40"
      />
      <ul class="evaluation-good">

        <li class="evaluation-good-item mt-flex-space-between">
          <span class="good-name">撒尿牛丸</span>
          <div class="good-review">
            <span class="good-like"><i class="iconfont icon-dianzan_xianxing" /> 赞</span>
            <span class="good-dislike"><i class="iconfont icon-cai" /> 踩</span>
          </div>
        </li>
        <li class="evaluation-good-item mt-flex-space-between">
          <span class="good-name">撒尿牛丸</span>
          <div class="good-review">
            <span class="good-like"><i class="iconfont icon-dianzan_xianxing" /> 赞</span>
            <span class="good-dislike"><i class="iconfont icon-cai" /> 踩</span>
          </div>
        </li>
        <li class="evaluation-good-item mt-flex-space-between">
          <span class="good-name">撒尿牛丸</span>
          <div class="good-review">
            <span class="good-like"><i class="iconfont icon-dianzan_xianxing" /> 赞</span>
            <span class="good-dislike"><i class="iconfont icon-cai" /> 踩</span>
          </div>
        </li>
        <li class="evaluation-good-item mt-flex-space-between">
          <span class="good-name">撒尿牛丸</span>
          <div class="good-review">
            <span class="good-like"><i class="iconfont icon-dianzan_xianxing" /> 赞</span>
            <span class="good-dislike"><i class="iconfont icon-cai" /> 踩</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="evaluation-btn">提交</div>
  </div>
</template>

<script type="text/ecmascript-6">
import Rate from '@/views/dumb/rate';
import headerNav from '@/views/dumb/header-nav';

export default {
  name: 'OrderEvaluation',

  data() {
    return {
      isSatisfied: '',
      evaPersonList: {
        satisfied: [
          {
            text: '快速准时',
            value: 0,
          },
          {
            text: '风雨无阻',
            value: 1,
          },
          {
            text: '仪表整洁',
            value: 2,
          },
          {
            text: '穿戴工服',
            value: 3,
          },
        ],
        not: [
          {
            text: '联系沟通困难',
            value: 0,
          },
          {
            text: '送错餐',
            value: 1,
          },
          {
            text: '送达不通知',
            value: 2,
          },
          {
            text: '配送慢',
            value: 3,
          },
        ],
      },
      evaPersonSelect: [],
      evaShopStar: 0,
    };
  },
  components: {
    Rate,
    headerNav,
  },
  methods: {
    evaPerson(target) {
      const index = this.evaPersonSelect.indexOf(target.value);
      console.log(index);
      if (index === -1) this.evaPersonSelect.push(target.value);
      else this.evaPersonSelect.splice(index, 1);
      console.log(this.evaPersonSelect);
    },
    selectSatisfied(type) {
      if (this.isSatisfied === type) return;
      this.isSatisfied = type;
      this.evaPersonSelect = [];
    },
    close() {
      const oThis = this;
      this.$dialog.alert({
        message: '确定关闭评价？',
        showCancelButton: true,
        cancelButtonText: '关闭评价',
        confirmButtonText: '再想想',
        beforeClose(action, done) {
          if (action === 'confirm') {
            done();
          } else {
            oThis.$router.go(-1);
            done();
          }
        },
      });
    },
  },
  computed: {
    evaluationTitle() {
      return '满意';
    },
  },
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
@import '~css/common';
.evaluation {
  .evaluation-box {
    background-color: white;
    margin: 0 10px 10px;
    padding: 8px;
    .top {
      padding-bottom: 5px;
      border-bottom: 1px solid $mt-light-gray;

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
        }
      }
    }
  }
  .evaluation-person {
    .evaluation-select {
      .select-box {
        margin: 15px auto;
        .select-box-btn {
          width: 80px;
          border-radius: 15px;
          padding: 6px 0;
          text-align: center;
          border: 1px solid $mt-light-gray;
          &.selected {
            background-color: $mt-color;
            border-color: $mt-color;
            color: #000;
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
            width: 25%;
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
    .evaluation-content {
      margin: 10px auto;
    }
    .evaluation-good {
      border-top: 1px solid $mt-light-gray;
      margin-top: 5px;
      .evaluation-good-item {
        padding: 8px 5px;
        .good-like,
        .good-dislike {
          border: 1px solid $mt-gray;
          border-radius: 10px;
          padding: 2px 8px;
          margin: 0 2px;
          i {
            font-size: 13px;
          }
        }
        .good-like.select {
          border-color: $mt-color;
          color: $mt-color;
        }
        .good-dislike.select {
          border-color: $mt-light-gray;
          background-color: $mt-light-gray;
        }
      }
    }
  }
  .evaluation-btn {
    padding: 20px 0;
    text-align: center;
    font-size: 18px;
    background-color: $mt-light-gray;
    color: #fff;
  }
}
</style>
