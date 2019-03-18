<template>
  <div
    class="van-checkbox van-checkbox__icon "
    @click="totggle"
    :class="value ? 'van-checkbox__icon--checked' : ''"
  >
    <i class="van-icon van-icon-success" />
    <slot />
  </div>
</template>

<script type="text/ecmascript-6">
import CONSTANT from "@/common/constant";

export default {
  name: "CheckBox",
  props: {
    name: [String, Number],
    value: [String, Number, Boolean],
    iconFont: {
      type: String,
      default: "icon-selected"
    },
    checkedColor: {
      type: String,
      default: CONSTANT.COLOR.MT
    }
  },
  methods: {
    totggle() {
      this.$emit("input", !this.value);
      this.$emit("click");
    }
  }
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.van-checkbox {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  i {
    border-radius: 50%;
  }
}
</style>
