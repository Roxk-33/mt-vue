import { getRect } from '@/common/utils';
import MtBetterScroll from '@/views/dumb/mt-better-scroll';

export default {
  components: {
    MtBetterScroll,
  },
  data() {
    return {
      FoodListScrollDisabel: false,
      scrollY: -1,
      scrollOption: {
        probeType: 3,
        pullUpLoad: false,
      },
      bannerHeight: 0,
      isTop: false, // 商品到顶
      trackSize: 0, // 商品列表高度
      trackTop: 0, // 商品列表Top
      trackOpacity: 0, // 顶部状态栏opacity
    };
  },
  methods: {
    throttle(callback, context, atleast = 100) {
      let previous = null;
      if (!context) context = this;
      return function() {
        const now = +new Date();
        if (!previous) previous = now;
        if (now - previous > atleast) {
          callback.apply(context, Array.prototype.slice.call(arguments, 0));
          // 重置上一次开始时间为本次结束时间
          previous = now;
        }
      };
    },
    initMenu() {
      // 35为 header-nav的高度
      // 45为 shop-good-tab的高度
      this.bannerHeight = getRect(this.$refs.shopBanner).height - 35 + 45;
      this.trackSize = document.body.clientHeight - 35 - 45;
      this.ballAniPoi.end.left = 60;
      this.ballAniPoi.end.top = document.body.clientHeight - 60;
    },
    scroll() {
      const oThis = this;
      document.addEventListener(
        'scroll',
        this.throttle(e => {
          e => {
            // 为了兼容Safari
            const scorllY = Math.abs(document.documentElement.scrollTop || window.pageYOffset);
            //
            if (!this.FoodListScrollDisabel) {
              this.isTop = false;
              if (this.bannerHeight > scorllY) {
                this.trackOpacity = scorllY / this.bannerHeight;
              } else {
                this.FoodListScrollDisabel = true;
                this.trackOpacity = '1';
                this.isTop = true;
              }
            } else if (this.bannerHeight > scorllY) {
              this.FoodListScrollDisabel = false;
            }
          };
        }, oThis),
      );
    },
    onFoodListPullingDown() {
      console.log('上拉');
      this.FoodListScrollDisabel = false;
    },
    onFoodListScroll(op) {
      this.scrollY = op.y;
      if (op.y > 1) {
        this.FoodListScrollDisabel = false;
      }
    },
  },
  computed: {
    shopGoodStyle() {
      return {
        height: `${this.trackSize}px`,
        top: `${this.trackTop}px`,
      };
    },
  },
};
