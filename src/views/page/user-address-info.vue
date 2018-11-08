<template>
  <div class="user-address-info">
    <header-nav :title="title"></header-nav>
    <form-item label="联系人" :isRequired="true" v-model="data.name"></form-item>
    <div class="user-address-info-sex">
      <van-radio :name="SEX['male']" :value="SEX['male']" v-model="data.sex">先生</van-radio>
      <van-radio :name="SEX['female']" :value="SEX['female']" v-model="data.sex">女士</van-radio>
    </div>
    <form-item label="手机号" :isRequired="true" v-model="data.tel"></form-item>
    <form-item label="送货地址" :isRequired="true" v-model="data.address"></form-item>
    <form-item label="门牌号" :isRequired="true" v-model="data.stress"></form-item>
    <div class="footer-box">
      <p class="save" @click="save">保存地址</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import headerNav from '@/views/dumb/header-nav';
import formItem from '@/views/dumb/form-item';
import CONSTANT from '@/common/constant';
export default {
  name: 'user-address-info',
  data() {
    return {
      text: '1231',
      SEX: CONSTANT.TYPE.SEX_EN,
      sex: 1,
      data: {
        name: '',
        sex: 0,
        tel: '',
        address: '',
        stress: '',
      },
    };
  },
  components: {
    formItem,
    headerNav,
  },
  created() {
    if (!this.isAdd) {
      this.$store.dispatch('getAddress').then(data => {
        this.data = data;
      });
    }
  },
  methods: {
    save() {
      if (this.isAdd) {
        this.$store.dispatch('addAddress', this.data).then(data => {});
      } else {
        this.$store.dispatch('editAddress', this.data).then(data => {});
      }
    },
  },
  computed: {
    isAdd() {
      console.log(this.$route.query);
      return this.$route.query.type === 'add';
    },
    addressId() {
      return this.$route.query.id || -1;
    },
    title() {
      return this.isAdd ? '新增送货地址' : '编辑送货地址';
    },
  },
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
@import '~css/common';
.user-address-info-sex {
  padding: 10px 10px 10px 90px;
  display: flex;
  background-color: #fff;
  border-bottom: 1px solid #b1adad57;
  .van-radio {
    font-size: 17px;
    margin-right: 40px;
  }
}

.footer-box {
  padding: 10px;
  background-color: #fff;
  .save {
    padding: 10px 0;
    font-size: 19px;
    background-color: #fbc134;
  }
}
</style>
<style rel="stylesheet/scss" lang="scss">
@import '~css/common';

.van-radio .van-icon-checked {
  color: $mt-color;
}
</style>
