<template>
  <div class="mt-pop-up">
    <div class="pop-up-header mt-flex-space-between">
      <span
        class="header-left"
        @click="emitEvent('clickHeaderLeft')"
      >{{ headerLeft }}</span>
      <span class="header-title">
        {{ headerTitle }}
      </span>
      <span
        class="header-right"
        @click="emitEvent('clickHeaderRight')"
      >{{ headerRight }}</span>
    </div>
    <slot />
    <div
      class="pop-up-bottom"
      @click="cancel"
      v-if="showBottomText"
    >
      <i
        class="iconfont"
        v-if="bottomTextIcon"
        :class="bottomTextIcon"
      />{{ bottomText }}
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'MtPopUp',
  props: {
    headerLeft: {
      type: String,
      default: '',
    },
    headerRight: {
      type: String,
      default: '',
    },
    headerTitle: {
      type: String,
      default: '',
    },
    bottomText: {
      type: String,
      default: '取消',
    },
    bottomTextIcon: {
      type: String,
      default: '',
    },
    showBottomText: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    emitEvent(event) {
      this.$emit(event);
    },
    cancel() {
      this.$emit('cancel');
    },
  },
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.pop-up-header {
  padding: 10px;
  border-bottom: 1px solid #b1adad12;
  .header-title {
    font-size: 16px;
  }
}
.pop-up-bottom {
  text-align: center;
  font-size: 15px;
  padding: 10px 0;
  border-top: 2px solid #b1adad12;
  i {
    margin-right: 5px;
  }
}
</style>
