<template>
  <div class="user-register">
    <header-nav :is-back="true" :title="headerTitle" :onLeft="true" @click-left="$router.back(-1);"></header-nav>
    <div class='container-box'>
      <van-cell-group>
        <van-field v-model="registerForm.account" label="用户名" placeholder="请输入用户名" />
        <van-field v-model="registerForm.password" label="密码" type='password' placeholder="请输入密码" required clearable />
        <van-field v-model="registerForm.repassword" label="重复密码" type='password' placeholder="请输入密码" required clearable />
      </van-cell-group>
      <div class="btn-box">

        <van-button type="default" round @click="handleRegister" :loading='loading'>注册</van-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import headerNav from 'src/views/dumb/header-nav';

export default {
  name: 'user-register',

  data() {
    return {
      headerTitle: '注册',
      registerForm: {
        account: '',
        password: '',
        repassword: '',
      },
      loading: false,
    };
  },
  components: {
    headerNav,
  },
  methods: {
    handleRegister() {
      this.$store
        .dispatch('user/RegiterByAccount', this.registerForm)
        .then(() => {
          this.loading = false;
          this.$router.push({ name: '/userIndex' });
        })
        .catch((e) => {
          this.$toast(e);
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.btn-box {
  text-align: center;
}
.van-button {
  width: 60%;
  line-height: 1rem;
  height: 1rem;
  font-size: 18px;
  margin-top: 20px;
  background-color: #ffd161;
  color: white;
}
</style>
