<template>
  <div class="parabola-ani" ref="ball"></div>
</template>

<script type="text/ecmascript-6">
import parabolaAnimation from 'vendors/parabola-animation';
export default {
  name: 'parabola-ani',
  data() {
    return {};
  },
  props: {
    isStart: Boolean,
    ballAniPoi: Object,
  },
  methods: {
    parabolaAnimation(el, options) {
      let oThis = this;
      // TODO:优化：复用第一次生成的小球
      let p = new parabolaAnimation('<div></div>', {
        speed: 1.1,
        className: 'parabola-ani',
        startPos: {
          left: this.ballAniPoi.start.left, //相对屏幕的left
          top: this.ballAniPoi.start.top, //相对屏幕的top
        },
        endPos: {
          left: this.ballAniPoi.end.left,
          top: this.ballAniPoi.end.top,
        },
        endFunc: function() {
          p.destroy(); //结束时的callback
          oThis.$emit('ani-end');
        },
      });
    },
  },
  watch: {
    isStart(val) {
      val && this.parabolaAnimation();
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.parabola-ani {
  background-color: $mt-color;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  z-index: $zindex-modal;
}
</style>
