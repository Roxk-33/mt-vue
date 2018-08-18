<template>
  <div class='personPage'>
    <div class='personPage-header'>
      <div class='header_setting'>
        <i class='fa fa-cog'></i>
        <i class='fa fa-commenting-o' style="    vertical-align: top;"></i>
      </div>
      <div class='header_content'>
        <div class='content-avatar' @click="toPage">
          <img :src='userAvatar'>
        </div>
        <span v-if="userStatus" class='content-info_body' @click="toPage">
          {{userName}}
        </span>
        <div v-else class='content-info_login' to='../login' @click="toPage">
          登录/注册
        </div>
      </div>
    </div>
    <div class='personPage-body'>
      <van-row class='fn-list' type="flex" justify="space-around">
        <van-col :span="8">
          <div class='fn-list-item'>
            <i class='iconfont icon-gouwudai'></i>
            <p>我的收藏</p>
          </div>
        </van-col>
        <van-col :span="8">
          <div class='fn-list-item'>
            <i class='iconfont icon-pingjia'></i>
            <p>我的评价</p>
          </div>
        </van-col>
        <van-col :span="8">
          <div class='fn-list-item'>
            <i class='iconfont icon-dizhi'></i>
            <p>我的地址</p>
          </div>
        </van-col>
      </van-row>
    </div>
    <footer-nav active='1'></footer-nav>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import footerNav from './dumb/footer-nav';

export default {
  name: 'personPage',
  components: {
    footerNav,
  },
  data() {
    return {};
  },
  computed: {
    userStatus() {
      return this.$store.state.user.userStatus;
    },
    userName() {
      return this.$store.state.user.userName;
    },
    userAvatar() {
      return this.$store.state.user.userAvatar;
    },
  },
  methods: {
    toPage() {
      if (this.userStatus) {
        this.$router.push('info');
      } else {
        this.$router.push({ path: '/login' });
      }
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss">
@import '../assets/style/common';

.personPage-header {
  height: 4rem;
  background-color: $mt-color;

  .header_setting {
    width: 20%;
    float: right;
    padding-top: 0.2rem;
    font-size: 20px;
  }
  .header_content {
    text-align: left;
    height: 100%;
    margin: 0px 30px;
    box-sizing: border-box;
    padding-top: 1.5rem;
    display: flex;
    align-items: center;

    .content-avatar {
      width: 55px;
      height: 55px;
      margin-right: 10px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    .content-info_body {
      min-width: 100px;
      color: black;
      font-size: 17px;
      position: relative;
      height: 50%;
      &::after {
        content: '个人信息>';
        font-size: 10px;
        display: block;
        position: absolute;
        left: 0;
        top: 30px;
      }
    }
    a {
      text-decoration: none;
      color: black;
    }
  }
}
.fn-list {
  padding-top: 1rem;
  background-color: white;
  .fn-list-item {
    font-size: 12px;
    font-weight: 500;

    .iconfont {
      color: $mt-color;
    }
  }
}
.test-box {
  height: 100px;
}
.test {
  display: inline-block;
}
.test img {
  width: 120px;
  height: 80px;
  display: inline-block;
}
</style>
