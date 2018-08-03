<template>
  <div class='footerNav'>
    <div class="grid-content bg-purple" @click="toPage('/shop/list')">
      <i class='fa fa-home fa-2x' :class='{"activitySvg" : routeName === "home" }'></i>
    </div>
    <div class="grid-content bg-purple" @click="toPage('/person/index')">
      <i class='fa icon-order fa-1-7x' :class='{"activitySvg" : routeName === "orderList" }'></i>

    </div>
    <div class="grid-content bg-purple" @click="toPage('/person/index')">
      <i class='fa fa-user-circle fa-2x' :class='{"activitySvg" : routeName === "personIndex" }'></i>
    </div>

  </div>

</template>
<script>
export default {
  name: 'footerNav',
  computed: {
    routeName() {
      return this.$route.name;
    },
  },
  props: {},
  data() {
    return {};
  },
  methods: {
    toPage(target) {
      this.$router.push({ path: target });
    },
  },
};
</script>
<style scoped rel="stylesheet/scss" lang="scss">
.footerNav {
  width: 100%;
  height: 1.5rem;
  line-height: 1.9rem;
  position: fixed;
  bottom: 0;
  background-color: whitesmoke;
  border-bottom: 1px solid rgba(128, 128, 128, 0.51);
  display: flex;
  justify-content: space-around;
  .svg-icon {
    color: gray;
  }
  .activitySvg {
    color: #ffd161;
  }
}
</style>
