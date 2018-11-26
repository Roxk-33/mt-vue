export default {
  data() {
    return {
      timer: null,
      IntervalTime: 500,
      countTime: null,
      cb: null,
      coutMin: 0,
      coutSec: 0,
    };
  },
  methods: {
    initCount(time, cb = null) {
      const now = new Date();
      time = new Date(time);
      this.countTime = Math.floor((time - now) / 1000);
      if (this.countTime <= 0) {
        cb && cb();
        return;
      }
      this.cb = cb;
      this.setCountdown();
    },
    setCountdown() {
      this.timer = setInterval(() => {
        this.countTime -= 0.5;
        if (this.countTime <= 0) this.clearCountDown();
      }, this.IntervalTime);
    },
    clearCountDown() {
      clearInterval(this.timer);
      this.cb();
    },
  },
  destroyed() {
    !!this.timer && clearInterval(this.timer);
  },
  watch: {
    countTime(val) {
      this.coutMin = Math.floor(val / 60);
      this.coutSec = Math.floor(val - this.coutMin * 60);
    },
  },
};
