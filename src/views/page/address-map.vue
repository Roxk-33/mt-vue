<template>
  <div class="address-map">
    <header-nav :title="title" />

    <div class="address-input">

      <form action="/">
        <van-search
          v-model="searchKey"
          placeholder="请输入你的收货地址"
          background="#fff"
          show-action
          @search="search"
          @keyup="search"
          @cancel="searchResult = []"
          @clear="searchResult = []"
        />
      </form>

    </div>
    <div
      class="baidu-map-box"
      v-show="searchResult.length === 0"
    >
      <div id='baidu-map'></div>
      <ul class="pois-list">
        <li
          class="pois-item"
          v-for="item in poisList"
          :key="item.uid"
          @click="getAddress(item.point.y,item.point.x,item.addr,item.name)"
        >
          <div class="left">
          </div>
          <div class="right">
            <p class="block">{{item.name}}</p>
            <p class="label">{{item.addr}}</p>
          </div>

        </li>
      </ul>
    </div>
    <div
      class="search-result"
      v-if="searchResult.length"
    >
      <div
        class="search-result-item"
        v-for="item in searchResult"
        :key="item"
        v-if="item.uid"
        @click='getAddress(item.location.lat,item.location.lng,item.province + "" + item.city + "" + item.district + "" +item.name)'
      >
        <p class="block">
          {{item.name}}
        </p>
        <p class="label">
          {{item.province + "" + item.city + "" + item.district + "" +item.name}}
        </p>

      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import headerNav from "@/views/dumb/header-nav";
export default {
  name: "address-map",

  data() {
    return {
      title: "选择收货地址",
      longitude: "",
      latitude: "",
      baiduMap: null,
      geolocation: null,
      province: "",
      city: "",
      searchKey: "",
      searchSuggest: "",
      searchResult: [],
      poisList: []
    };
  },
  components: {
    headerNav
  },
  methods: {
    getAddress(latitude, longitude, addr, name) {
      this.latitude = latitude;
      this.longitude = longitude;
      this.$emit("select-address", {
        addr: addr,
        point: { lat: this.latitude, lng: this.longitude },
        name: name
      });
    },
    getPoisInfo() {
      this.$store
        .dispatch("user/getMapInfo", {
          location: this.latitude + "," + this.longitude
        })
        .then(resp => {
          this.poisList = resp.result.pois;
        });
    },
    initMap() {
      this.baiduMap = new BMap.Map("baidu-map");
      this.geolocation = new BMap.Geolocation();
      const oThis = this;
      this.geolocation.getCurrentPosition(function(r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          var point = new BMap.Point(r.longitude, r.latitude);
          var marker = new BMap.Marker(point);
          oThis.latitude = r.latitude;
          oThis.longitude = r.longitude;

          oThis.baiduMap.centerAndZoom(point, 17);
          oThis.baiduMap.addOverlay(marker);
          oThis.province = r.address.province;
          oThis.city = r.address.city;
          oThis.getPoisInfo();
        } else {
          alert("failed" + this.getStatus());
        }
      });

      function showInfo(e) {
        oThis.baiduMap.clearOverlays(); //清除地图上所有覆盖物
        const mk = new BMap.Marker(e.point);
        oThis.baiduMap.addOverlay(mk);
        oThis.baiduMap.panTo(e.point);

        oThis.latitude = e.point.lat;
        oThis.longitude = e.point.lng;
        oThis.getPoisInfo();
      }
      this.baiduMap.addEventListener("click", showInfo);
    },
    search() {
      console.log(this.searchKey);
      if (this.searchKey === "") return;
      this.$store
        .dispatch("user/searchMapInfo", {
          query: this.searchKey,
          region: "广州"
        })
        .then(resp => {
          this.searchResult = resp.result;
        });
    }
  },

  mounted() {
    this.initMap();
    this.search();
  }
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.address-map {
  background-color: #fff;
  height: 100%;
}
#baidu-map {
  width: 100%;
  height: 200px;
}
.address-input {
  background-color: #fff;
}
.pois-list {
  background-color: #fff;
  .pois-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 8px 15px;
    .left {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: $mt-color;
      margin-right: 10px;
    }
    .right {
      flex: 1;
      padding-bottom: 5px;
      border-bottom: 1px solid $mt-light-gray;
    }
    .block {
      color: $mt-color;
      font-size: 17px;
    }
    .label {
      margin-top: 5px;
      color: $mt-gray;
    }
  }
}
.search-result {
  .search-result-item {
    padding: 8px 15px;
    border-bottom: 1px solid $mt-light-gray;
    .block {
      font-size: 15px;
    }
    .label {
      font-size: 13px;
      color: gray;
      margin-top: 5px;
    }
  }
}
</style>
<style>
.address-map .van-field__body {
  height: 100%;
}
.address-map .van-cell--borderless {
  background-color: #f1f1f1;
}
</style>