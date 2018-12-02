<template>
  <div class="user-address-info">
    <header-nav :title="title" />
    <form-item
      label="联系人"
      :is-required="true"
      v-model="addressInfo.user_name"
      placeholder="请填写收货人的姓名"
    />

    <div class="user-address-info-sex">
      <van-radio
        :name="SEX_EN['male']"
        :value="SEX_EN['male']"
        v-model="addressInfo.user_sex"
      >先生</van-radio>
      <van-radio
        :name="SEX_EN['female']"
        :value="SEX_EN['female']"
        v-model="addressInfo.user_sex"
      >女士</van-radio>
    </div>
    <form-item
      label="手机号"
      :is-required="true"
      v-model="addressInfo.tel"
      placeholder="请填写收货人手机号码"
    />
    <form-item
      label="送货地址"
      :is-required="true"
      v-model="addressInfo.address"
      @click="showAddressMap"
    />
    <form-item
      label="标签"
      :is-required="false"
      v-model="addressInfo.tag"
      :show-slot="true"
    >
      <div class="tag-box">
        <span
          class="tag"
          @click="addressInfo.tag = tag.value"
          :class="{'active' :addressInfo.tag === tag.value }"
          v-for="tag in tags"
          :key="tag.value"
        >
          {{ tag.label }}
        </span>
      </div>
    </form-item>
    <form-item
      label="门牌号"
      :isRequired="true"
      v-model="addressInfo.stress"
    ></form-item>
    <div class="footer-box">
      <p
        class="save"
        @click="save"
      >保存地址</p>
    </div>

    <van-popup v-model="showMap">
      <user-address-map
        :select-address="selectAddress"
        @close="closeAddressMap"
      />
    </van-popup>
  </div>
</template>

<script type="text/ecmascript-6">
import headerNav from "@/views/dumb/header-nav";
import formItem from "@/views/dumb/form-item";
import userAddressMap from "@/views/smart/user-address-map";
import CONSTANT from "@/common/constant";
import { getLocation } from "@/common/map";

export default {
  name: "UserAddressInfo",
  data() {
    return {
      text: "1231",
      SEX_EN: CONSTANT.TYPE.SEX_EN,
      showMap: false,
      sex: 1,
      addressInfo: {
        user_name: "",
        user_sex: 0,
        tel: "",
        address: "",
        tag: ""
      },
      tags: [
        {
          value: 0,
          label: "公司"
        },
        {
          value: 1,
          label: "学校"
        },
        {
          value: 2,
          label: "家"
        }
      ]
    };
  },
  components: {
    formItem,
    userAddressMap,
    headerNav
  },
  created() {
    if (!this.isAdd) {
      this.$store.dispatch("user/getAddressInfo", this.addressId).then(resp => {
        this.addressInfo = Object.assign({}, resp.data);
      });
    } else {
      this.getAddress();
    }
  },
  methods: {
    closeAddressMap() {
      this.showMap = false;
    },
    showAddressMap() {
      this.showMap = true;
    },
    selectAddress(data) {
      console.log(data);
      this.showMap = false;
    },
    getAddress() {
      // getLocation().then(data => {
      //   this.$store
      //     .dispatch("user/getMapInfo", {
      //       location: data
      //     })
      //     .then(resp => {
      //       this.addressInfo.address = resp.result.formatted_address;
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     });
      // });
    },
    save() {
      try {
        if (this.isAdd) {
          this.$store
            .dispatch("user/addAddress", this.addressInfo)
            .then(data => {
              this.$router.push({ name: "userAddressList" });
            });
        } else {
          console.log(this.addressInfo);
          this.$store
            .dispatch("user/editAddress", this.addressInfo)
            .then(data => {
              this.$router.push({ name: "userAddressList" });
            });
        }
      } catch (error) {
        this.$toast(error);
      }
    }
  },
  computed: {
    isAdd() {
      return this.$route.query.type === "add";
    },
    addressId() {
      return this.$route.query.id || -1;
    },
    title() {
      return this.isAdd ? "新增送货地址" : "编辑送货地址";
    }
  }
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.user-address-info {
  height: 100%;
  background-color: #fff;
}
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
<style>
.user-address-info .van-popup {
  width: 100%;
  height: 100%;
}
</style>
