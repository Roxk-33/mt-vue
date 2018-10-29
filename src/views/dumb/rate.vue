<template>
  <div class="rate">
    <span v-for="(item,index) in list" :key="index" @click="onSelect(index)">
      <i class="iconfont" :class="item ? selectIcon : notIcon" :style="style"></i>
    </span>
    <span v-if="isShowText">{{ value }}</span>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'rate',

  data() {
    return {
      hoverIndex: -1,
      selectIcon: '',
      notIcon: '',
    };
  },
  mounted() {
    this.selectIcon = this.iconClasses[0];
    this.notIcon = this.iconClasses[1];
    console.log(this.selectIcon);
  },
  props: {
    isShowText: {
      type: Boolean,
      default: true,
    },

    disabled: {
      type: Boolean,
      default: false,
    },
    max: {
      type: Number,
      default: 5,
    },
    iconClasses: {
      type: Array,
      default() {
        return ['icon-star', 'icon-empty-star'];
      },
    },
    value: {
      type: Number,
      default: 0,
    },
    size: {
      type: Number,
      default: 20,
    },
    marginLeft: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    activeClass() {
      return this.iconClasses[0];
    },
    voidClass() {
      return this.iconClasses[2];
    },
    halfClass() {
      return this.iconClasses[1];
    },
    style() {
      return {
        fontSize: this.size + 'px',
        marginLeft: this.marginLeft + 'px',
      };
    },
    list() {
      console.log(Array.apply(null, { length: this.max }).map((value, index) => index < this.value));
      return Array.apply(null, { length: this.max }).map((value, index) => index < this.value);
    },
  },
  components: {},
  methods: {
    onSelect(index) {
      if (!this.disabled) {
        this.$emit('input', index + 1);
        this.$emit('change', index + 1);
      }
    },
  },
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.iconfont {
  margin-left: 5px;
}
.icon-star {
  color: #ffd161;
}
</style>
