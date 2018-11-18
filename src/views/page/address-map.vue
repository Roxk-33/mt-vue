<template>
  <div class="page">
    <div id="baidu-map"></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: '',

  data() {
    return {
      longitude: '',
      latitude: '',
    };
  },
  components: {},
  methods: {},
  mounted() {
    var map = new BMap.Map('baidu-map');

    // function myFun(result) {
    //   var cityName = result.name;
    //   map.setCenter(cityName);
    //   alert('当前定位城市:' + cityName);
    // }
    // var myCity = new BMap.LocalCity();
    // myCity.get(myFun);
  },
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
#baidu-map {
  width: 100%;
  height: 200px;
}
</style>
