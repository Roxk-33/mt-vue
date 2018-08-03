<template>
  <div class='login-container'>
    <van-nav-bar :title="headerTitle" left-text="" left-arrow @click-left="$router.back(-1);" />
    <div class='container-box'>
      <van-cell-group>
        <van-field v-model="loginForm.account" label="用户名" placeholder="请输入用户名" />
        <van-field v-model="loginForm.password" label="密码" type='password' placeholder="请输入手机号" />
      </van-cell-group>
      <van-button type="default" round @click="handleLogin" :loading='loading'>登录</van-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'loginPage',
  components: {},
  data() {
    return {
      headerTitle: '登录美团',
      loading: false,
      loginForm: {
        account: 'admin',
        password: '123456',
      },
    };
  },

  methods: {
    handleLogin() {
      // this.$refs['loginForm'].validate((valid) => {
      // if (valid) {
      this.loading = true;
      this.$store
        .dispatch('LoginByAccount', this.loginForm)
        .then(() => {
          this.loading = false;
          this.$router.push({ path: '/person/index' });
        })
        .catch(() => {
          this.loading = false;
        });
      // } else {
      //     console.log('error submit!!');
      //     return false;
      // }
      // });
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.login-container {
  background-color: white;
  height: 100%;
  .container-box {
    width: 100%;
    margin: 10px auto;
  }
  .el-input input {
    border: 0;
    border-radius: 0;
    border-bottom: 1px solid rgba(128, 128, 128, 0.51);
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
}
</style>
