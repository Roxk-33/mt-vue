<template>
  <div>
    <div class='mt-pop-mask' v-show="visible"></div>
    <transition name='box-scale'>
      <div class="mt-pop" v-show="visible">
        <div class='mt-pop-box' v-click-outside="closeEvent" :style="style">
          <div class='mt-pop-box_header' :class='{"mt-pop-box_header__center" :center}'>
            <span class='mt-pop-box_title'>{{title}}</span>
            <i class='mt-pop-box_close fa fa-close' @click="closeEvent"></i>
          </div>
          <div class='mt-pop-box_content'>
            <slot></slot>
          </div>
          <div class='mt-pop-box_footer' v-if="$slots.footer">
            <slot name='footer'></slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import Clickoutside from '@/directive/clickoutside';

export default {
  name: 'mt-pop',

  data() {
    return {
      closed: false,
    };
  },
  directives: { Clickoutside },

  props: {
    title: {
      type: String,
      default: '标题',
    },
    width: {
      type: String,
      default: '90%',
    },
    visible: {
      type: Boolean,
      default: true,
    },
    center: {
      type: Boolean,
      default: false,
    },
  },
  components: {},
  methods: {
    closeEvent() {
      if (this.visible) {
        this.$emit('update:visible', false);
        this.closed = false;
      }
    },
    doOpen() {
      // if (!this.bodyOverflow) {
      //   this.bodyPaddingRight = document.body.style.paddingRight;
      //   this.bodyOverflow = document.body.style.overflow;
      // }
      // scrollBarWidth = getScrollBarWidth();
      // const bodyHasOverflow = document.documentElement.clientHeight < document.body.scrollHeight;
      // const bodyOverflowY = getStyle(document.body, 'overflowY');
      // if (scrollBarWidth > 0 && (bodyHasOverflow || bodyOverflowY === 'scroll')) {
      //   document.body.style.paddingRight = `${scrollBarWidth }px`;
      // }
      // document.body.style.overflow = 'hidden';
    },
  },
  computed: {
    style() {
      const style = {};
      if (this.width) {
        style.width = `${this.width}`;
      }

      return style;
    },
  },

  watch: {
    visible(val) {
      if (val) {
        // this.closed = false;
        // // this.$el.addEventListener('scroll', this.updatePopper);
        // this.$nextTick(() => {
        //   this.$refs.dialog.scrollTop = 0;
        // });
        // if (this.appendToBody) {
        //   document.body.appendChild(this.$el);
        // }
        document.body.style.overflow = 'hidden';
      } else {
        // this.$el.removeEventListener('scroll', this.updatePopper);
        // if (!this.closed) this.$emit('close');
        document.body.style.overflow = 'visible';
      }
    },
  },
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
//  弹窗
.mt-pop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 101;
  width: 100%;
  height: 100%;
}
.mt-pop-box {
  position: relative;
  width: 6rem;
  border-right: 5px;
  background-color: white;
  z-index: 101;
  border-radius: 5px;
  margin: 25vh auto;
  .mt-pop-box_header {
    // height: 1rem;
    // background-color: #ffd161;
    text-align: left;
    position: relative;
    padding: 10px 5px;

    &.mt-pop-box_header__center {
      text-align: center;
    }
    .mt-pop-box_title {
      line-height: 18px;
      font-size: 18px;
      color: #303133;
    }
    .mt-pop-box_close {
      position: absolute;
      right: 10px;
      line-height: 18px;
      font-size: 18px;
    }
  }
  .mt-pop-box_content {
    box-sizing: border-box;
    overflow-y: scroll;
    overflow-x: hidden;
    position: relative;
  }
  .mt-pop-box_footer {
    padding: 10px 20px 0;
    text-align: right;
    box-sizing: border-box;
  }
}
.mt-pop-mask {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;
}
// 滚动条样式
::-webkit-scrollbar {
  width: 14px;
  height: 14px;
}

::-webkit-scrollbar-track,
::-webkit-scrollbar-thumb {
  border-radius: 999px;
  border: 5px solid transparent;
}

::-webkit-scrollbar-track {
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2) inset;
}

::-webkit-scrollbar-thumb {
  min-height: 20px;
  background-clip: content-box;
  box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.2) inset;
}

::-webkit-scrollbar-corner {
  background: transparent;
}
</style>
