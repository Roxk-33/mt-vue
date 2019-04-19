<template>
  <div class="login-container">
    <header-nav title :isBack="false" :border="false" :back-router="backRouter">
      <router-link to="/user/register" class="register">注册</router-link>
    </header-nav>
    <div class="container-box">
      <p class="container-box-title">欢迎登录嘻嘻外卖</p>
      <div class="form-item">
        <input type="text" v-model="loginForm.account" placeholder="请输入账号">
      </div>
      <div class="form-item">
        <input :type="pswType" v-model="loginForm.password" placeholder="请输入密码">
        <i
          class="iconfont"
          @click="showPsw"
          :class="pswType === 'text' ? 'icon-show' : 'icon-yincang'"
        ></i>
        <i class="iconfont icon-close" @click="clearPsw"></i>
      </div>
      <van-button
        type="default"
        round
        @click="handleLogin"
        loading-text="登录中"
        :class="{ 'is-loading': loading }"
      >登录</van-button>
    </div>
  </div>
</template>
<script>
import headerNav from "@/views/dumb/header-nav";

export default {
  name: "UserLogin",
  data() {
    return {
      loading: false,
      backRouter: {
        name: "userIndex"
      },
      pswType: "password",
      loginForm: {
        account: "",
        password: ""
      }
    };
  },
  components: {
    headerNav
  },
  methods: {
    showPsw() {
      this.pswType = this.pswType === "text" ? "password" : "text";
    },
    clearPsw() {
      this.loginForm.password = "";
    },
    handleLogin() {
      if (this.loading) return;
      this.loading = true;
      this.$store
        .dispatch("user/LoginByAccount", this.loginForm)
        .then(() => {
          this.loading = false;
          this.$store.dispatch("cart/getCartList");
          this.$router.go(-1);
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
  color: $mt-color;
  font-size: 0.5rem;
}
.login-container {
  background-color: white;
  height: 100%;
  text-align: center;
  .container-box {
    margin: 30px auto;
    padding: 0 20px;
  }
  .container-box-title {
    text-align: left;
    font-size: 0.7rem;
    margin-bottom: 30px;
  }
  .form-item {
    padding: 5px 10px;
    margin-bottom: 10px;
    text-align: center;
    position: relative;
    input {
      font-size: 0.7rem;
      border: 0;
      border-radius: 0;
      width: 80%;
      padding: 5px;
      border-bottom: 1px solid #dedede;
    }

    .iconfont {
      position: absolute;
      margin-left: -22px;
      top: 50%;
      transform: translateY(-50%);
      &.icon-close {
        font-size: 12px;
        margin-left: -40px;
      }
    }
  }

  .van-button {
    width: 90%;
    position: relative;
    font-size: 0.6rem;
    margin-top: 20px;
    background-color: #ffd161;
    color: #fff;
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
    &.is-loading::after {
      pointer-events: none;
      content: "";
      position: absolute;
      left: -1px;
      top: -1px;
      right: -1px;
      bottom: -1px;
      border-radius: inherit;
      background-color: hsla(0, 0%, 100%, 0.35);
    }
  }
}
</style>
<style rel="stylesheet/scss" lang="scss">
.login-container .header-nav-left .icon-close {
  font-size: 0.5rem;
  color: $mt-color;
}
</style>
