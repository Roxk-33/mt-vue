<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </section>
</template>

<script>
export default {
  name: "Layout",
  created() {
    this.$store
      .dispatch("user/getUserInfo")
      .then(() => {
        this.$store.dispatch("cart/getCartList");
      })
      .catch(err => {});
    this.$store.dispatch("user/getLocation").catch(err => {
      console.log(err);
      this.$toast({
        duration: 3000, // 持续展示 toast
        message: err
      });
    });
  },
  computed: {
    cachedViews() {
      // return this.$store.state.app.cachedViews;
    }
  }
};
</script>
<style>
.app-main {
  height: 100%;
  min-height: 100%;
}
</style>
