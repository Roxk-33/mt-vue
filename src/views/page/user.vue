<template>
  <div class='user-index'>
    <div class='user-index-header'>
      <div class='header_setting'>
        <i class='fa fa-cog' />

        <i class='fa fa-commenting-o' style="vertical-align: top;" />
      </div>
      <div class='header_content'>
        <router-link class='content-avatar' to="/user/info">
          <img :src='userAvatar'>
        </router-link>
        <router-link v-if="userName" class='content-info_body' to="/user/info">
          {{ userName }}
        </router-link>
        <router-link v-else class='content-info_login' to="/user/login">
          登录/注册
        </router-link>
      </div>
    </div>
    <div class='user-index-body'>
      <van-row class='fn-list' type="flex" justify="space-around">
        <van-col :span="8">
          <div class='fn-list-item'>
            <i class='iconfont icon-gouwudai' />
            <p>我的收藏</p>
          </div>
        </van-col>
        <van-col :span="8">
          <router-link class='fn-list-item' to="/user/evaluation/list">
            <i class='iconfont icon-pingjia' />
            <p>我的评价</p>
          </router-link>
        </van-col>
        <van-col :span="8">
          <router-link class='fn-list-item' to="/user/address/list">

            <i class='iconfont icon-dizhi' />
            <p>我的地址</p>
          </router-link>
        </van-col>
      </van-row>
    </div>
    <footer-nav active='1' />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import footerNav from '@/views/dumb/footer-nav';

export default {
  name: 'UserIndex',
  components: {
    footerNav,
  },
  data() {
    return {};
  },
  mounted() {},
  computed: {
    userName() {
      return this.$store.state.user.userName;
    },
    userAvatar() {
      return this.$store.state.user.userAvatar;
    },
  },
  methods: {},
};
</script>
<style rel="stylesheet/scss" lang="scss">
.user-index-header {
  height: 3rem;
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
    margin-left: 20px;
    box-sizing: border-box;
    padding-top: 0.5rem;
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
  padding: 0.4rem 0;
  background-color: white;
  text-align: center;
  .fn-list-item {
    font-size: 12px;
    font-weight: 500;

    .iconfont {
      color: $mt-color;
      font-size: 28px;
    }
  }
}
</style>
