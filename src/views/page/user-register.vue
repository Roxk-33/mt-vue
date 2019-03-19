<template>
  <div class="register-container">
    <header-nav title="" :border="false" />
    <div class="container-box">
      <p class="container-box-title">欢迎加入嘻嘻外卖</p>
      <div class="form-item">
        <i class="iconfont icon-person" />
        <input
          type="text"
          v-model="registerForm.account"
          placeholder="请输入账号"
        />
      </div>
      <div class="form-item">
        <i class="iconfont icon-mima" />

        <input
          :type="pswType"
          v-model="registerForm.password"
          placeholder="请输入密码"
        />
        <i
          class="iconfont"
          @click="showPsw"
          :class="pswType === 'text' ? 'icon-show' : 'icon-yincang'"
        ></i>
      </div>
      <div class="form-item">
        <i class="iconfont icon-mima" />

        <input
          :type="pswType"
          v-model="registerForm.repassword"
          placeholder="请再次输入密码"
        />
        <i
          class="iconfont"
          @click="showPsw"
          :class="pswType === 'text' ? 'icon-show' : 'icon-yincang'"
        ></i>
      </div>
      <van-button
        type="default"
        round
        @click="handleRegister"
        :class="{ 'is-loading': loading }"
        >注册</van-button
      >
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import headerNav from "@/views/dumb/header-nav";

export default {
  name: "UserRegister",

  data() {
    return {
      registerForm: {
        account: "",
        password: "",
        repassword: ""
      },
      pswType: "password",
      loading: false
    };
  },
  components: {
    headerNav
  },
  methods: {
    showPsw() {
      this.pswType = this.pswType === "text" ? "password" : "text";
    },
    handleRegister() {
      this.$store
        .dispatch("user/RegiterByAccount", this.registerForm)
        .then(() => {
          this.loading = false;
          this.$router.push({ name: "/userIndex" });
        })
        .catch(e => {
          this.$toast(e);
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.register-container {
  background-color: white;
  height: 100%;
  text-align: center;
  .container-box {
    margin: 30px auto;
    padding: 0 0.5rem;
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
      font-size: 0.4rem;
      border: 0;
      border-radius: 0;
      width: 100%;
      padding: 5px;
      padding-left: 22px;
      border-bottom: 1px solid #dedede;
    }

    .iconfont {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      margin-top: -2px;
      &.icon-person,
      &.icon-mima {
        left: 10px;
      }
      &.icon-show,
      &.icon-yincang {
        right: 5px;
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