<template>
  <div class='person-info'>
    <header-nav
      :is-back="true"
      :title="headerTitle"
      @click-left="$router.back(-1);"
    />

    <ul class='info-box'>
      <li class='info-box-avatar'>
        <span class='info-box_title'>头像</span>
        <span class='info-box_content'>
          <img
            class='box-avatar_img'
            :src='userAvatar'
          >
        </span>
      </li>
      <li @click="showPop('username')">
        <span class='info-box_title'>用户名</span>
        <span class='info-box_content'>
          {{ userName }}
          <van-icon name="arrow" />
        </span>
      </li>
      <li @click="showPop('password')">
        <span class='info-box_title'>账户密码</span>
        <span class='info-box_content'>
          <van-icon name="arrow" />
        </span>
      </li>
      <li @click="showPop('tel')">
        <span class='info-box_title'>手机号</span>
        <span class='info-box_content'>
          {{ userTel | filterTel }}
          <van-icon name="arrow" />
        </span>
      </li>
    </ul>
    <div class='info-footer'>
      <span @click="logout">退出当前账号</span>
    </div>

    <van-popup
      v-model="show"
      position="right"
    >

      <div
        class="username-box user-info-pop-box"
        v-if="boxType === 'username'"
      >
        <header-nav
          title="修改用户名"
          @click-left="show=false"
        >
          <span @click="changeName">确定</span>
        </header-nav>
        <div class="content">
          <span class="content-label">用户名:</span>
          <input
            type="text"
            class="content-input"
            v-model="nameNew"
          >
        </div>
        <p class="warm-text">以英文或汉字开头，限4-16个字符，一个字符为2个字符</p>
      </div>
      <div
        class="password-box user-info-pop-box"
        v-if="boxType === 'password'"
      >
        <header-nav
          title="设置密码"
          @click-left="show=false"
          :on-left="true"
        />
        <div class="content">
          <input
            type="password"
            class="content-input"
            v-model="psw"
            placeholder="新密码:"
          >
        </div>
        <div class="content">
          <input
            type="password"
            class="content-input"
            v-model="pswRe"
            placeholder="确认新密码:"
          >
        </div>
        <p class="warm-text">密码长度8~32位，须包含数字、字母、符号至少两种或以上的元素</p>
        <button
          class="sumbit"
          @click="changePsw"
        >确认提交</button>
      </div>
      <div
        class="tel-box user-info-pop-box"
        v-if="boxType === 'tel'"
      >
        <header-nav
          title="更换手机号"
          @click-left="show=false"
          :on-left="true"
        />
        <h2 class="title">输入新的手机号</h2>
        <div class="content">
          <span class="content-label">+86</span>

          <input
            type="text"
            class="content-input"
            v-model="tel"
            @click="showKey"
          >
        </div>
        <button
          class="sumbit"
          @click="getCode"
        >获取验证码</button>
      </div>
    </van-popup>

    <van-number-keyboard
      :z-index="2005"
      :show="showKeyBoard"
      extra-key="."
      close-button-text="完成"
      @blur="showKeyBoard = false"
      @input="onInputTel"
      @delete="onDeleteTel"
    />
  </div>
</template>
<script>
import headerNav from 'src/views/dumb/header-nav';
import {
  testUserName, testPsw, testTel, formatTel,
} from 'src/common/utils';

export default {
  name: 'UserInfo',
  data() {
    return {
      headerTitle: '我的帐号',
      show: false,
      showKeyBoard: false,
      boxType: '',
      nameNew: '',
      psw: '',
      pswRe: '',
      tel: '',
    };
  },
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
  },
  methods: {
    showPop(type) {
      console.log(type);
      this.show = true;
      this.boxType = type;
    },
    logout() {
      this.$store
        .dispatch('user/LogOut')
        .then(() => {
          this.$router.push({ name: 'userIndex' });
          window.location.reload();
        })
        .catch(this.$toast);
    },
    changeName() {
      const { status, msg } = testUserName(this.nameNew);
      if (!status) return this.$toast(msg);
      this.$store
        .dispatch('user/updateUserInfo', {
          action: 'changeName',
          data: this.nameNew,
        })
        .then((resp) => {
          this.show = false;
          this.$toast(resp.message);
        })
        .catch(this.$toast);
    },
    changePsw() {
      const { status, msg } = testPsw(this.psw, this.pswRe);
      if (!status) return this.$toast(msg);
      this.$store
        .dispatch('user/updateUserInfo', {
          action: 'changePsw',
          data: this.psw,
        })
        .then((resp) => {
          this.$toast(resp.message);
          this.$router.back(-1);
        })
        .catch(this.$toast);
    },
    changeTel() {
      const { status, tel } = testTel(this.tel);
      if (!status) return this.$toast('非法手机');
      this.$store
        .dispatch('user/updateUserInfo', {
          action: 'changeTel',
          data: tel,
        })
        .then((resp) => {
          this.$toast(resp.message);
          this.$router.back(-1);
        })
        .catch(this.$toast);
    },
    getCode() {
      const { status, tel } = testTel(this.tel);
      if (!status) return this.$toast('手机格式错误');
      this.$store
        .dispatch('user/updateUserInfo', {
          action: 'changeTel',
          data: tel,
        })
        .then((resp) => {
          this.$toast(resp.message);
          this.$router.back(-1);
        })
        .catch(this.$toast);
    },
    onInputTel(number) {
      this.tel += number;
      this.tel = formatTel(this.tel);
    },
    onDeleteTel(ev) {
      const temp = this.tel.substring(0, this.tel.length - 1);
      this.tel = formatTel(temp);
    },
    showKey() {
      this.showKeyBoard = true;
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
@import '~css/common';

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
    font-size: 17px;
    color: #fff;
    border: 0;
    padding: 8px;
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
    border-color: $mt-light-gray;
    .content-input {
      width: 100%;
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
    .content-label {
      padding-right: 20px;
    }
    .content-input {
      flex: 1;
    }
  }
}
</style>
