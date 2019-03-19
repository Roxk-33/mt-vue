<template>
  <div class="person-info">
    <header-nav :title="headerTitle" />

    <ul class="info-box">
      <li class="info-box-avatar">
        <span class="info-box_title">头像</span>
        <van-uploader
          :after-read="changeAvatar"
          accept="image/gif, image/jpeg"
          multiple
        >
          <span class="info-box_content">
            <img class="box-avatar_img" :src="userAvatar" />
          </span>
        </van-uploader>
      </li>
      <li @click="showPop('username')">
        <span class="info-box_title">用户名</span>
        <span class="info-box_content">
          {{ userName }}
          <van-icon name="arrow" />
        </span>
      </li>
      <li @click="showPop('password')">
        <span class="info-box_title">账户密码</span>
        <span class="info-box_content">
          <van-icon name="arrow" />
        </span>
      </li>
      <li @click="showPop('tel')">
        <span class="info-box_title">手机号</span>
        <span class="info-box_content">
          {{ userTel | filterTel }}
          <van-icon name="arrow" />
        </span>
      </li>
    </ul>
    <div class="info-footer">
      <span @click="logout">退出当前账号</span>
    </div>

    <van-popup v-model="show" position="right">
      <div class="username-box user-info-pop-box" v-if="boxType === 'username'">
        <header-nav
          title="修改用户名"
          @left-click-fn="show = false"
          :left-click="true"
        >
          <span @click="changeName">确定</span>
        </header-nav>
        <div class="content">
          <span class="content-label">用户名:</span>
          <input type="text" class="content-input" v-model="nameNew" />
        </div>
        <p class="warm-text">
          以英文或汉字开头，限4-16个字符，一个字符为2个字符
        </p>
      </div>
      <div class="password-box user-info-pop-box" v-if="boxType === 'password'">
        <header-nav
          title="设置密码"
          @left-click-fn="show = false"
          :left-click="true"
        />
        <div class="content">
          <input
            type="password"
            class="content-input"
            v-model="psw"
            placeholder="新密码:"
          />
        </div>
        <div class="content">
          <input
            type="password"
            class="content-input"
            v-model="pswRe"
            placeholder="确认新密码:"
          />
        </div>
        <p class="warm-text">
          密码长度8~32位，须包含数字、字母、符号至少两种或以上的元素
        </p>
        <button class="sumbit" @click="changePsw">确认提交</button>
      </div>
      <div class="tel-box user-info-pop-box" v-if="boxType === 'tel'">
        <header-nav
          title="更换手机号"
          @left-click-fn="show = false"
          :left-click="true"
        />
        <h2 class="title">输入新的手机号</h2>
        <div class="content">
          <input
            type="text"
            class="content-input"
            v-model="tel"
            @click="showKeyBoard = true"
            @input="onInputTel"
          />
        </div>
        <button
          class="sumbit"
          @click="getCode"
          :class="{ 'tel-correct': telCorrect }"
        >
          获取验证码
        </button>
      </div>
      <div class="vercode-box" v-if="boxType === 'vercode'">
        <header-nav
          title="更换手机号"
          @left-click-fn="show = false"
          :left-click="true"
        />
        <h2 class="title">输入验证码</h2>
        <div class="content">
          <p class="content-block">验证码已下发至{{ tel }}</p>
          <span class="content-label">
            57s后重新获取
          </span>
          <div class="code-box">
            <div
              class="code-input"
              v-for="(item, index) in codeInputfocusStatus"
              :key="index"
            >
              <span class="code-show">{{ codeInput[index] }}</span>
              <div class="code-ani" v-if="item"></div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>

    <!-- <van-number-keyboard
      :z-index="2005"
      :show="showKeyBoard"
      extra-key="."
      close-button-text="完成"
      @blur="showKeyBoard = false"
      @input="onInputTel"
      @delete="onDeleteTel"
    />
-->
    <van-number-keyboard
      :z-index="2005"
      :show="showKeyBoardCode"
      extra-key="."
      close-button-text="完成"
      @blur="showKeyBoard = false"
      @input="onInputCode"
      @delete="onDeleteCode"
    />
  </div>
</template>
<script>
import headerNav from "@/views/dumb/header-nav";
import { validateUserName, validatePsw, validateTel } from "@/common/utils";

export default {
  name: "UserInfo",
  data() {
    return {
      headerTitle: "我的帐号",
      show: false,
      showKeyBoard: false,
      boxType: "",
      nameNew: "",
      psw: "",
      pswRe: "",
      tel: "18024589062",
      telCorrect: false,
      showKeyBoardCode: false, // 控制输入验证码的键盘
      codeInput: {
        // 输入的验证码
        0: "",
        1: "",
        2: "",
        3: ""
      },
      codeInputLen: 0
    };
  },
  components: {
    headerNav
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

    codeInputfocusStatus() {
      let arr = [false, false, false, false];
      if (this.codeInputLen < 4 && this.codeInputLen >= 0) {
        arr[this.codeInputLen] = true;
      }
      return arr;
    }
  },
  methods: {
    // 上传头像
    changeAvatar(file) {
      this.$store.dispatch("user/uploadAvatar", file.file).then(resp => {
        return this.$toast(resp.message);
      });
    },
    // 获取验证码
    getCode() {
      const { status, tel } = validateTel(this.tel);
      if (!status) return this.$toast("手机格式错误");
      if (tel === this.userTel)
        return this.$toast("该手机号为当前用户的绑定手机号");
      this.$store.dispatch("user/getPhoneCode", tel).then(resp => {
        this.boxType = "vercode";
        this.showKeyBoardCode = true;
        return this.$toast(resp.message);
      });
    },
    showPop(type) {
      this.show = true;
      this.boxType = type;
    },
    logout() {
      this.$store
        .dispatch("user/LogOut")
        .then(() => {
          this.$router.push({ name: "userLogin" });
          window.location.reload();
        })
        .catch(this.$toast);
    },
    changeName() {
      const { status, msg } = validateUserName(this.nameNew);
      if (!status) return this.$toast(msg);
      this.$store
        .dispatch("user/updateUserInfo", {
          action: "changeName",
          userName: this.nameNew
        })
        .then(resp => {
          this.show = false;
          this.$toast(resp.message);
        })
        .catch(this.$toast);
    },
    changePsw() {
      const { status, msg } = validatePsw(this.psw, this.pswRe);
      if (!status) return this.$toast(msg);
      this.$store
        .dispatch("user/updateUserInfo", {
          action: "changePsw",
          psw: this.psw
        })
        .then(resp => {
          this.$toast(resp.message);
          this.$router.back(-1);
        })
        .catch(this.$toast);
    },

    bindPhone() {
      let code = "";
      Object.keys(this.codeInput).forEach(key => {
        code += this.codeInput[key];
      });
      const { status, tel } = validateTel(this.tel);
      this.$store
        .dispatch("user/updateUserInfo", {
          action: "changeTel",
          tel,
          code
        })
        .then(resp => {
          this.$toast(resp.message);
          this.$router.back(-1);
        })
        .catch(this.$toast);
    },
    onInputTel(ev) {
      const number = ev.data;
      if (isNaN(number)) {
        this.tel = this.tel.substring(0, this.tel.length - 1);
        return this.$toast("请输入数字");
      }

      // this.tel = this.formatTel(this.tel);
      const { status } = validateTel(this.tel);
      this.telCorrect = status;
    },
    onDeleteTel(ev) {
      const len = this.tel.length;
      if (len === 5 || len === 10) {
        this.tel = this.tel.substring(0, len - 2);
      } else {
        this.tel = this.tel.substring(0, len - 1);
      }
    },
    onInputCode(number) {
      if (this.codeInputLen === 4) return;
      this.codeInput[this.codeInputLen++] = number;
      // 已输入四位验证码
      if (this.codeInputLen === 4) {
        this.bindPhone();
      }
    },
    onDeleteCode(ev) {
      if (this.codeInputLen === 0) return;
      this.codeInput[--this.codeInputLen] = "";
    },
    formatTel(tel) {
      const len = tel.length;
      if (len === 3 || len === 8) {
        return (tel += " ");
      }
      return tel;
    }
  },
  filters: {
    filterTel(value) {
      if (!value) return "未绑定手机号";
      return `${value.substr(0, 3)}****${value.substr(7, 4)}`;
    }
  }
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
.van-popup--right {
  width: 100%;
  height: 100%;
}
.user-info-pop-box {
  .content {
    width: 90%;
    font-size: 14px;
    padding: 7px;
    border-radius: 5px;
    margin: 10px auto;
    border: 1px solid $mt-color;
    box-sizing: border-box;
    .content-input {
      border: 0;
    }
  }
  .warm-text {
    margin: 0 auto;
    max-width: 90%;
  }
  .sumbit {
    width: 90%;
    display: block;
    margin: 5px auto;
    font-size: 20px;
    color: #fff;
    background-color: $mt-gray;
    border: 0;
    padding: 12px 8px;
    &.tel-correct {
      background-color: $mt-color;
      color: #000;
    }
  }
}
.username-box .content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .content-input {
    flex: 1;
  }
}
.password-box {
  .content {
    font-size: 19px;
    border: 0;
    box-sizing: content-box;
    margin-bottom: 0;
    .content-input {
      height: 1.2rem;
      line-height: 1.2rem;
      width: 100%;
      border: 1px solid $mt-gray;
      line-height: 1.2rem;
      padding: 7px;
      box-sizing: border-box;
    }
  }
  .warm-text {
    color: $mt-gray;
  }
  .sumbit {
    width: 90%;
    display: block;
    margin: 5px auto;
    font-size: 17px;
    color: #fff;
    background-color: $mt-color;
    border-radius: 5px;
    border: 0;
    padding: 8px;
  }
}
.tel-box {
  .title {
    margin-left: 15px;
  }
  .content {
    border: 0;
    border-bottom: 1px solid $mt-light-gray;
    display: flex;
    justify-content: flex-start;
    border-radius: 0;
    height: 1rem;
    line-height: 1rem;
    padding: 0 7px;
    .content-label {
      padding-right: 20px;
    }
    .content-input {
      flex: 1;
      font-size: 21px;
    }
  }
}
.vercode-box {
  .title {
    margin: 30px 0 0 40px;
  }
  .content {
    margin: 30px 0 0 40px;

    .content-block {
      font-size: 16px;
      margin-bottom: 8px;
    }
    .code-box {
      width: 80%;
      display: flex;
      margin-top: 10px;
      justify-content: space-between;
      .code-input {
        position: relative;
        width: 40px;
        height: 40px;
        line-height: 40px;
        border: 1px solid $mt-gray;
        border-radius: 3px;
        font-size: 30px;
        text-align: center;
        box-sizing: border-box;
      }
      .code-ani {
        height: 30px;
        width: 1px;
        background-color: #000;
        animation: show-hide 0.8s infinite;
        @include center;
      }
    }
  }
  @keyframes show-hide {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}
</style>
