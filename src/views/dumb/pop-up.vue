<template>
  <div class="mt-popUp">
    <slot></slot>
    <div class="popUp-bottom" @click="cancel">
      {{bottomText}}
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'mt-popUp',
  props: {
    bottomText: {
      type: String,
      default: '取消',
    },
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    cancel() {
      console.log(1);
      this.$emit('cancel');
    },
  },
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.popUp-bottom {
  text-align: center;
  height: 30px;
  line-height: 30px;
  font-size: 15px;
  ;
  padding-top: 10px 0;
  border-top: 5px solid #c3c2c2;
}
</style>
