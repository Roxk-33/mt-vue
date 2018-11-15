<template>
  <div class="user-address-info">
    <header-nav :title="title"></header-nav>
    <form-item label="联系人" :isRequired="true" v-model="data.user_name" placeholder="请填写收货人的姓名"></form-item>
    <div class="user-address-info-sex">
      <van-radio :name="SEX['male']" :value="SEX['male']" v-model="data.user_sex">先生</van-radio>
      <van-radio :name="SEX['female']" :value="SEX['female']" v-model="data.user_sex">女士</van-radio>
    </div>
    <form-item label="手机号" :isRequired="true" v-model="data.tel" placeholder="请填写收货人手机号码"></form-item>
    <form-item label="送货地址" :isRequired="true" v-model="data.address"></form-item>
    <form-item label="标签" :isRequired="false" v-model="data.tag" :showSlot="true">
      <div class="tag-box">
        <span class="tag" @click="data.tag = tag.value" :class="{'active' :data.tag === tag.value }" v-for="tag in tags" :key="tag.value">
          {{tag.label}}
        </span>
      </div>
    </form-item>
    <!-- <form-item label="门牌号" :isRequired="true" v-model="data.stress"></form-item> -->
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
        user_name: '',
        user_sex: 0,
        tel: '',
        address: '',
        tag: '',
      },
      tags: [
        {
          value: 0,
          label: '公司',
        },
        {
          value: 1,
          label: '学校',
        },
        {
          value: 2,
          label: '家',
        },
      ],
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
      try {
        if (this.isAdd) {
          this.$store.dispatch('user/addAddress', this.data).then(data => {
            this.$router.push({ name: 'userAddressList' });
          });
        } else {
          this.$store.dispatch('user/editAddress', this.data).then(data => {
            this.$router.push({ name: 'userAddressList' });
          });
        }
      } catch (error) {
        this.$toast(error);
      }
    },
  },
  computed: {
    isAdd() {
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
  border-bottom: 1px solid #b1adad12;
  .van-radio {
    font-size: 17px;
    margin-right: 40px;
  }
}
.tag-box {
  display: flex;
  justify-content: flex-start;
  .tag {
    padding: 3px 8px;
    border: 1px solid $mt-gray;
    margin-right: 10px;
    font-size: 12px;
    &.active {
      background-color: $mt-color;
      border-color: $mt-color;
    }
  }
}
.footer-box {
  padding: 10px;
  background-color: #fff;
  .save {
    padding: 8px 0;
    font-size: 15px;
    background-color: $mt-color;
    text-align: center;
  }
}
</style>
