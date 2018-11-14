<template>
  <div class='person-info'>
    <header-nav :is-back="true" :title="headerTitle" @click-left="$router.back(-1);"></header-nav>

    <ul class='info-box'>
      <li class='info-box-avatar'>
        <span class='info-box_title'>头像</span>
        <span class='info-box_content'>
          <img class='box-avatar_img' :src='userAvatar'>
        </span>
      </li>
      <li>
        <span class='info-box_title'>用户名</span>
        <span class='info-box_content'>
          {{userName}}
          <van-icon name="arrow" />
        </span>
      </li>
      <li>
        <span class='info-box_title'>账户密码</span>
        <span class='info-box_content'>
          <van-icon name="arrow" />

        </span>

      </li>
      <li>
        <span class='info-box_title'>手机号</span>
        <span class='info-box_content'>
          {{userTel | filterTel}}
          <van-icon name="arrow" />

        </span>
      </li>
    </ul>
    <div class='info-footer'>
      <span @click="logout">退出当前账号</span>
    </div>
  </div>
</template>
<script>
import headerNav from '@/views/dumb/header-nav';
import { mapGetters } from 'vuex';

export default {
  name: 'user-info',
  components: {
    headerNav,
  },
  computed: {
    userName() {
      return this.$store.state.user.userName;
    },
    userAvatar() {
      return this.$store.state.user.userAvatar;
    },
    userTel() {
      return this.$store.state.user.userTel;
    },
    // ...mapGetters(['userName', 'userAvatar', 'userTel']),
  },
  data() {
    return {
      headerTitle: '我的帐号',
    };
  },
  methods: {
    logout() {
      this.$store
        .dispatch('user/LogOut')
        .then(() => {
          this.$router.push({ path: '/user/index' });
          window.location.reload();
        })
        .catch(message => {});
    },
  },
  filters: {
    filterTel(value) {
      if (!value) return '未绑定手机号';
      return `${value.substr(0, 3)}****${value.substr(7, 4)}`;
    },
  },
};
</script>
<style lang="scss" scoped>
.info-box {
  background-color: white;
  padding: 0;

  .info-box-avatar {
    height: 1.5rem;
    line-height: 1.5rem;
  }
  .box-avatar_img {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
  }
  li {
    display: flex;
    justify-content: space-between;
    list-style-type: none;
    padding: 10px;
    line-height: 1rem;
    height: 1rem;
    border-bottom: 1px solid #e5e5e5;
    font-size: 18px;
  }
}
.info-footer {
  position: absolute;
  bottom: 0;
  text-align: center;
  width: 100%;
  height: 1.5rem;
  line-height: 1.5rem;
  font-size: 20px;
  color: red;
  background-color: white;
}
</style>
