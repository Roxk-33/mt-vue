<template>
  <section class="app-main" style="min-height: 100%">
    <transition name="fade" mode="out-in">
      <!-- <keep-alive :include="cachedViews"> -->
      <router-view></router-view>
      <!-- </keep-alive> -->
    </transition>
  </section>
</template>

<script>
export default {
  name: 'layout',
  created() {
    this.$store.dispatch('user/getUserInfo').then(() => {
      this.$store.dispatch('cart/getCartList');
    });
  },
  computed: {
    cachedViews() {
      // return this.$store.state.app.cachedViews;
    },
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  },
};
</script>
