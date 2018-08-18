<template>
  <div class="user-address-list">
    <header-nav title="我的收货地址">
      <span @click="go('add')">新增地址</span>
    </header-nav>
    <div class="address-list-box">
      <div class="address-list-item">
        <p class="address-content">广东财经大学</p>
        <span class="address-user">肖志豪</span>
        <span class="address-sex">先生</span>
        <i class="iconfont icon-xiugai" @click="go('edit',1)"></i>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import headerNav from './dumb/header-nav';

export default {
  name: 'user-address-list',

  data() {
    return {};
  },
  components: {
    headerNav,
  },
  methods: {
    go(type, id = -1) {
      this.$router.push({ path: '/user/address/info/', query: { type, id } });
    },
  },
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.address-list-box {
  .address-list-item {
    text-align: left;
    padding: 5px 15px;
    background-color: #fff;
    position: relative;
  }
  .address-content {
    font-weight: 600;
    font-size: 17px;
    margin: 5px 0 10px;
  }
  .icon-xiugai {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
