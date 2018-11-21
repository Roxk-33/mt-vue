export default {
  data() {
    return {
      timer: null,
      IntervalTime: 500,
      countTime:null,
      cb:null,
    };
  },
  methods: {
    initCount(time,cb) {
      const now = new Date();
      time = new Date(time);
      this.countTime = Math.floor((time - now)/1000);
      console.log(this.countTime,time);
      this.cb = cb;
      this.setCountdown();
    },
    setCountdown() {
      this.timer = setInterval(() => {
        this.countTime -= 0.5;
        if(this.countTime <= 0) this.clearCountDown();
      }, this.IntervalTime);
    },
    clearCountDown() {
      console.log('调用了cb')
      clearInterval(this.timer);
      this.cb();
    }
  },
  destroyed(){
    console.log('destroyed');
    !!this.timer && clearInterval(this.timer);
  }

}