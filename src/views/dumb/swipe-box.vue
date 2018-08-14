
<template>
  <div class="swipe">
    <div :style="trackStyle" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" @touchcancel="onTouchEnd" class="swipe-track">
      <slot />
    </div>
    <div v-if="showIndicators && count > 1">
    </div>
  </div>
</template>

<script>
// import create from '@/utils/create';
import Touch from '@/mixins/touch';
export default {
  name: 'swipe',
  mixins: [Touch],
  props: {
    autoplay: Number,
    vertical: Boolean,
    loop: {
      type: Boolean,
      default: true,
    },
    touchable: {
      type: Boolean,
      default: true,
    },
    initialSwipe: {
      type: Number,
      default: 0,
    },
    showIndicators: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      width: 0,
      height: 0,
      offset: 0,
      offsetStart: 0,
      active: 0,
      deltaX: 0,
      deltaY: 0,
      swipes: [],
      startX: 0,
      duration: 0,
      durationL: 0,
      durationR: 0,
      threshold: 400,
      timingFunction: 'linear',
    };
  },
  mounted() {
    this.initialize();
  },
  destroyed() {
    this.clear();
  },
  watch: {
    swipes() {
      this.initialize();
    },
    initialSwipe() {
      this.initialize();
    },
    autoplay(autoplay) {
      if (!autoplay) {
        this.clear();
      } else {
        this.autoPlay();
      }
    },
  },
  computed: {
    count() {
      return this.swipes.length;
    },
    delta() {
      return this.vertical ? this.deltaY : this.deltaX;
    },
    size() {
      return this[this.vertical ? 'height' : 'width'];
    },
    trackSize() {
      return this.count * (120 + 10);
    },

    trackStyle() {
      return {
        [this.vertical ? 'height' : 'width']: `${this.trackSize}px`,
        transitionDuration: `${this.duration}ms`,
        transitionTimingFunction: `${this.timingFunction}ms`,
        transform: `translate${this.vertical ? 'Y' : 'X'}(${this.offset}px)`,
      };
    },
    boundary() {
      return this.durationR >= this.offset || this.offset >= 0;
    },
  },
  methods: {
    // initialize swipe position
    initialize() {
      clearTimeout(this.timer);
      if (this.$el) {
        const rect = this.$el.getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height;
      }

      this.durationR = this.width - this.trackSize;
    },
    onTouchStart(event) {
      this.clear();
      this.duration = 0;
      this.transitionTimingFunction = 'linear';
      this.offsetStart = this.offset;
      this.touchStart(event);
    },
    onTouchMove(event) {
      this.touchMove(event);
      //判断往哪个方向滑动

      event.preventDefault();
      event.stopPropagation();

      this.move(this.delta);
    },
    onTouchEnd() {
      this.endTime = new Date().getTime();
      // 惯性滑动
      if (this.endTime - this.startTime < this.threshold) {
        this.duration = 400;
        this.offsetStart = this.offset;
        this.move(this.delta * 5);
        this.transitionTimingFunction = 'ease-out';
      }
      if (this.boundary) {
        let offsetMove = this.delta;
        if (this.offset > this.durationL) {
          offsetMove = -this.offsetStart;
        } else if (this.durationR >= this.offset) {
          offsetMove = this.durationR - this.offsetStart;
        }
        this.duration = 200;
        this.move(offsetMove);
      }
    },
    move(offsetMove = 0) {
      // 已经在最左边
      if (offsetMove >= 0 && this.offset >= this.durationL) {
        offsetMove = (offsetMove + this.offsetStart) / 5 - this.offsetStart;
      } else if (offsetMove <= 0 && this.durationR >= this.offset) {
        // 已经在最右边
        offsetMove = (this.offsetStart + offsetMove - this.durationR) / 5 + this.durationR - this.offsetStart;
      }

      this.offset = this.offsetStart + offsetMove;
    },
    clear() {
      clearTimeout(this.timer);
    },
  },
};
</script>
<style scoped>
.swipe {
  overflow: hidden;
  position: relative;
  -webkit-user-select: none;
  user-select: none;
}
.swipe-track {
  height: 100%;
}
</style>
