import parabolaAnimation from 'vendors/parabola-animation';

export default {
  data() {
    return {
      ballAniPoi: {
        start: {
          left: 0,
          top: 0,
        },
        end: {
          left: 100,
          top: 620,
        },
      },
      ballAniCb: null,
    };
  },

  methods: {
    _startBallAni() {
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
          oThis.ballAniCb && oThis.ballAniCb();
        },
      });
    },
  },
};
