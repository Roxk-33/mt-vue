<template>
  <div
    class="check-box"
    @click="totggle"
    :class="value ? 'checked' : ''"
  >
    <i
      class="iconfont"
      :class="value ? iconFont : 'icon-xuanze1'"
      :style="style"
    />
    <slot />
  </div>
</template>

<script type="text/ecmascript-6">
import CONSTANT from '@/common/constant';

export default {
  name: 'CheckBox',
  props: {
    name: [String, Number],
    value: [String, Number, Boolean],
    iconFont: {
      type: String,
      default: 'icon-selected',
    },
    checkedColor: {
      type: String,
      default: CONSTANT.COLOR.MT,
    },
  },
  data() {
    return {};
  },
  methods: {
    totggle() {
      if (this.value) {
        this.$emit('input', false);
      } else this.$emit('input', true);
      this.$emit('click');
    },
  },
  computed: {
    style() {},
  },
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
@import '~css/common';

.check-box {
  display: inline-flex;
  align-items: center;
  &.checked i {
    background-color: $mt-color;
    color: #fff;
    font-size: 14px;
  }
  i {
    border-radius: 50%;
    margin-right: 4px;
    font-size: 15px;
    width: 17px;
    height: 17px;
    text-align: center;
    line-height: 20px;
    color: $mt-gray;
  }
}
</style>
