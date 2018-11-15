<template>
  <div class="user-address-list">
    <header-nav title="我的收货地址">
      <router-link :to="{ name:'userAddressInfo', query: { type, id } }">新增地址</router-link>
    </header-nav>
    <div class="address-list-box">
      <div class="address-list-item" v-for="item in list" :key="item.id">
        <p class="address-content">{{item.address}}</p>
        <span class="address-user">{{item.user_name}}</span>
        <span class="address-sex">{{item.user_sex == 0 ? '先生':'女士'}}</span>
        <i class="iconfont icon-xiugai" @click="go('edit',1)"></i>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import headerNav from '@/views/dumb/header-nav';

export default {
  name: 'user-address-list',

  data() {
    return {
      list: [],
    };
  },
  components: {
    headerNav,
  },
  methods: {
    getData() {
      this.$store
        .dispatch('user/getAddressList')
        .then(resp => {
          this.list = resp.data;
        })
        .catch(this.$toast);
    },
  },
  created() {
    this.getData();
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
