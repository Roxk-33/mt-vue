<template>
  <div class="user-evaluation-list">
    <header-nav
      :back-router="backRouter"
      headerbgColor="transparent"
      :border="false"
    />
    <div class="header">
      <img :src="userAvatar" class="user-avatar" />
      <p class="user-name">{{ userName }}</p>
    </div>
    <mt-better-scroll
      ref="contentScroll"
      :data="evalList"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp"
    >
      <div class="list-box">
        <div class="list-item" v-for="item in evalList" :key="item.id">
          <div class="shop-info mt-flex-space-between">
            <router-link
              :to="{ name: 'shopDetail', params: { id: item.shop_info.id } }"
            >
              <i class="iconfont icon-dianpu"></i>
              {{ item.shop_info.shop_title }}
            </router-link>
            <i class="iconfont icon-xiangyou"></i>
          </div>
          <div class="eval-info">
            <img :src="userAvatar" class="user-avatar" />
            <div class="detail-info">
              <div class="detail-header mt-flex-space-between">
                <span class="user-name">{{ userName }}</span>
                <span class="eval-time">2018.11.24</span>
              </div>
              <div class="detail-middle">
                <div class="shop-rate">
                  商家
                  <rate
                    v-model="rate"
                    :size="10"
                    :margin-left="5"
                    :isShowText="false"
                  />
                </div>
                <div class="distribution-type">
                  {{ item.distribution_type ? "美团专送" : "商家自配送" }}
                </div>
              </div>
              <div class="detail-bottom">
                <span>口味:{{ item.taste_rate }}星</span>
                <span>包装:{{ item.packing_rate }}星</span>
              </div>
            </div>
          </div>
          <div class="btn-box">
            <!-- <span>
              <i class="iconfont icon-fenxiangcopy"></i>
              分享
            </span> -->
            <!-- <span>
              <i class="iconfont icon-pinglun"></i>
              追评
            </span> -->
            <span @click="deleteItem(item.id)">
              <i class="iconfont icon-shanchu"></i>
              删除
            </span>
          </div>
        </div>
      </div>
    </mt-better-scroll>

    <list-empty :isShow="finished" />
  </div>
</template>

<script type="text/ecmascript-6">
import headerNav from "@/views/dumb/header-nav";
import Rate from "@/views/dumb/rate";
import MtBetterScroll from "@/views/dumb/mt-better-scroll";
import listEmpty from "@/views/dumb/list-empty";

export default {
  name: "user-evaluation-list",

  data() {
    return {
      rate: 4,
      evalList: [],
      page: 0,
      finished: false,
      backRouter: {
        name: "userIndex"
      }
    };
  },
  components: {
    headerNav,
    MtBetterScroll,
    Rate,
    listEmpty
  },
  methods: {
    getList() {
      // 初次进入页面展示loadnig
      if (this.evalList.length === 0 && this.page === 0) {
        this.mtLoading = true;
      }
      this.$store
        .dispatch("user/getEvalList", this.page)
        .then(resp => {
          this.mtLoading = false;

          if (resp.data.length === 0 && this.page === 0) {
            this.finished = true;
            this.evalList = [];
            return;
          }
          if (this.page === 0) {
            this.evalList = resp.data;
          } else {
            this.evalList = this.evalList.concat(resp.data);
          }
          this.page++;
        })
        .catch(err => {
          console.log(err);
          this.mtLoading = false;
          this.finished = true;
          this.loading = false;
          this.$toast(err);
        });
    },
    deleteItem(id) {
      this.$dialog
        .confirm({
          message: "确定删除这条评价吗？"
        })
        .then(() => {
          this.$store
            .dispatch("user/delEval", id)
            .then(resp => {
              this.evalList = [];
              this.getList();
              return this.$toast("删除成功");
            })
            .catch(err => {
              console.log(err);
              this.$toast(err);
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    onPullingDown() {
      this.page = 0;
      this.getList();
    },
    onPullingUp() {
      this.loading = true;
      this.getList();
    }
  },
  mounted() {
    this.getList();
  },
  computed: {
    userName() {
      return this.$store.state.user.userName;
    },
    userAvatar() {
      return this.$store.state.user.userAvatar;
    }
  },
  filters: {
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
.user-evaluation-list {
  min-height: 100%;
}
.header {
  margin-top: -50px;
  height: 120px;
  display: flex;
  flex-flow: column;
  align-items: center;
  padding-top: 10px;
  background-color: $mt-light-color;
  .user-avatar {
    border-radius: 50%;
    width: 60px;
    height: 60px;
  }
  .user-name {
    font-size: 18px;
    margin: 10px 0 5px;
  }
}
.list-box {
  .list-item {
    background-color: #fff;
    margin-bottom: 5px;
    padding: 0 8px 5px;
    .shop-info {
      padding: 15px 0 9px;
      border-bottom: 1px solid #dfdfdf;
      font-size: 15px;
      span {
        vertical-align: middle;
        color: $mt-gray;
      }
      .icon-xiangyou {
        color: $mt-gray;
      }
    }
    .eval-info {
      margin-top: 15px;
      display: flex;
      justify-content: flex-start;
      .user-avatar {
        border-radius: 50%;
        width: 40px;
        height: 40px;
        margin-right: 5px;
      }
      .detail-info {
        border-bottom: 1px solid $mt-light-gray;
        padding-bottom: 5px;
        flex: 1;
        .detail-header {
          margin-bottom: 8px;
          .user-name {
            font-size: 15px;
          }
          .eval-time {
            color: $mt-gray;
            font-size: 12px;
          }
        }
        .detail-middle {
          display: flex;
          justify-content: flex-start;
          margin-bottom: 8px;
          > div {
            margin-right: 9px;
          }
          .shop-rate {
            display: flex;
            align-content: center;
            margin-right: 20px;
            .rate {
              display: inline-block;

              vertical-align: text-top;
            }
          }
        }
        .detail-bottom {
          span {
            margin-right: 8px;
          }
        }
      }
    }
    .btn-box {
      text-align: right;
      margin-top: 8px;

      span {
        margin-left: 8px;
        font-size: 14px;

        i {
          vertical-align: text-top;
          color: $mt-gray;
        }
      }
    }
  }
}
</style>
