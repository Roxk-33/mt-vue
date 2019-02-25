<template>
  <div class="login-container">
    <header-nav :title="headerTitle">
      <router-link to="/user/register" class="register">注册</router-link>
    </header-nav>
    <div class="container-box">
      <van-cell-group>
        <van-field
          v-model="loginForm.account"
          label="用户名"
          placeholder="请输入用户名"
        />
        <van-field
          v-model="loginForm.password"
          label="密码"
          type="password"
          placeholder="请输入密码"
          clearable
        />
      </van-cell-group>
      <van-button type="default" round @click="handleLogin" :loading="loading"
        >登录</van-button
      >
    </div>
  </div>
</template>
<script>
import headerNav from "@/views/dumb/header-nav";

export default {
  name: "UserLogin",
  data() {
    return {
      headerTitle: "登录美团",
      loading: false,
      loginForm: {
        account: "admin",
        password: "5634398"
      }
    };
  },
  components: {
    headerNav
  },
  methods: {
    handleLogin() {
      // this.loading = true;
      this.$store
        .dispatch("user/LoginByAccount", this.loginForm)
        .then(() => {
          this.loading = false;
          this.$store.dispatch("cart/getCartList");
          this.$router.push({ name: "userIndex" });
        })
        .catch(e => {
          this.$toast(e);
          this.loading = false;
        });
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.register {
  color: #000;
}
.login-container {
  background-color: white;
  height: 100%;
  text-align: center;
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
