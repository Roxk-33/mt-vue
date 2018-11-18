<template>
  <div class="user-address-list">
    <header-nav title="我的收货地址">
      <router-link :to="{ name:'userAddressInfo', query: { type:'add'} }">新增地址</router-link>
    </header-nav>
    <div class="address-list-box">
      <van-swipe-cell :right-width="65" v-for="item in list" :key="item.id">
        <van-cell-group>
          <van-cell>
            <slot name="title">
              <p class="address-content">{{item.address}}</p>
            </slot>
            <slot name="label">
              <span class="address-user">{{item.user_name}}</span>
              <span class="address-sex">{{item.user_sex == 0 ? '先生':'女士'}}</span>
            </slot>
            <i slot="right-icon" class="iconfont icon-xiugai" @click="go('edit',item.id)"></i>
          </van-cell>
        </van-cell-group>
        <span slot="right" @click="delAddress(item.id)">删除</span>
      </van-swipe-cell>
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
    go(type, id) {
      this.$router.push({ name: 'userAddressInfo', query: { type, id } });
    },
    delAddress(id) {
      this.$store
        .dispatch('user/delAddress', id)
        .then(resp => {
          this.$toast(resp.message);
          this.getData();
        })
        .catch(this.$toast);
    },
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
  }
  .icon-xiugai {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
<style>
.van-swipe-cell__right {
  color: #fff;
  font-size: 18px;
  width: 65px;
  height: 68px;
  display: inline-block;
  text-align: center;
  line-height: 68px;
  background-color: #f44;
}
</style>
