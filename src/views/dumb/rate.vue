<template>
  <div class="rate">
    <span
      v-for="(item,index) in list"
      :key="index"
      @click="onSelect(index)"
    >
      <i
        class="iconfont"
        :class="item ? iconSelected : iconUnSel"
        :style="{marginLeft:marginLeft + 'px',fontSize:size+'px',color:item ? selectedColor : unSelectedColor}"
      />
    </span>
    <span
      v-if="isShowText"
      class="score"
    >{{ value }}</span>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "Rate",
  props: {
    isShowText: {
      type: Boolean,
      default: true
    },

    disabled: {
      type: Boolean,
      default: false
    },
    max: {
      type: Number,
      default: 5
    },
    iconArr: {
      type: Array,
      default() {
        return ["icon-star", "icon-empty-star"];
      }
    },
    value: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 20
    },
    marginLeft: {
      type: Number,
      default: 10
    },
    selectedColor: {
      type: String,
      default: "#f5c44e"
    },
    unSelectedColor: {
      type: String,
      default: "#cacaca"
    }
  },
  data() {
    return {
      hoverIndex: -1,
      iconSelected: "",
      iconUnSel: ""
    };
  },
  mounted() {
    [this.iconSelected, this.iconUnSel] = this.iconArr;
    this.iconSelected += " selected";
  },

  computed: {
    activeClass() {
      return this.iconArr[0];
    },
    voidClass() {
      return this.iconArr[2];
    },
    halfClass() {
      return this.iconArr[1];
    },
    style() {
      return {
        fontSize: `${this.size}px`,
        marginLeft: `${this.marginLeft}px`
      };
    },
    list() {
      return Array.from({ length: this.max }).map(
        (value, index) => index < this.value
      );
    }
  },
  methods: {
    onSelect(index) {
      if (!this.disabled) {
        this.$emit("input", index + 1);
        this.$emit("change", index + 1);
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.rate {
  .iconfont {
    margin-left: 5px;
  }
  .icon-star {
    color: #ffd161;
  }
  .score {
    margin-left: 5px;
  }
}
</style>
