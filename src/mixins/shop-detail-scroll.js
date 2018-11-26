import BetterScroll from '@/views/dumb/scroll';
import { getRect } from '@/common/utils';

export default {
  components: {
    BetterScroll,
  },
  data() {
    return {
      scrollDisabel: false,
      probeType: 3,
      bannerHeight: 0,
      isTop: false,
      trackSize: 0, // 商品列表高度
      trackTop: 0, // 商品列表Top
      trackOpacity: 0, // 顶部状态栏opacity
    };
  },
  methods: {
    initMenu() {
      // 35为 header-nav的高度
      // 45为 shop-good-tab的高度
      this.bannerHeight = getRect(this.$refs.shopBanner).height - 35;
      this.trackSize = window.innerHeight - 45 - 35 + 1;
      this.ballAniPoi.end.left = 60;
      this.ballAniPoi.end.top = window.innerHeight - 60;
    },
    scroll() {
      document.addEventListener('scroll', e => {
        const scorllY = Math.abs(document.documentElement.scrollTop || window.pageYOffset);
        if (!this.scrollDisabel) {
          // 为了兼容Safari
          this.isTop = false;
          if (this.bannerHeight > scorllY) {
            this.trackOpacity = scorllY / this.bannerHeight;
          } else {
            this.scrollDisabel = true;
            this.trackOpacity = '1';
            this.isTop = true;
          }
        } else if (this.bannerHeight > scorllY) {
          this.scrollDisabel = false;
        }
      });
    },
    onScroll(op) {
      if (op.y > 1) {
        console.log('菜单到顶');
        this.scrollDisabel = false;
      }
    },
  },
};
