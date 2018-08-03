<template>
  <div class="page">
    <span v-for="(item,index) in max" :key="index">
      <i :class="classes[index]" style="margin-left:1px;"></i>
    </span>

    <span>{{ currentValue }}</span>

  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'rate',

  data() {
    return {
      currentValue: this.rateValue,
      hoverIndex: -1,
    };
  },
  props: {
    rateValue: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 5,
    },
    iconClasses: {
      type: Array,
      default() {
        return ['fa fa-star', 'fa fa-star-half-empty', 'fa fa-star-o'];
      },
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
    classes() {
      const result = [];
      let i;
      const threshold = Math.floor(this.currentValue);
      for (i = 0; i < threshold; i += 1) {
        result.push(this.activeClass);
      }
      if (this.currentValue - threshold) {
        result.push(this.halfClass);
        i += 1;
      }
      for (; i <= this.max; i += 1) {
        result.push(this.voidClass);
      }

      return result;
    },
  },
  components: {},
  methods: {},
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.fa-star,
.fa-star-half-empty {
  color: #ffd161;
}
</style>
