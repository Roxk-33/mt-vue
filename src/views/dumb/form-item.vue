<template>
  <div class="form-item">
    <div class="form-item-label">
      <p v-if="label">{{label}}:</p>
    </div>
    <div class="form-item-input">
      <input :type="type" :value="value" :readonly="readonly" ref="input" v-on="listeners">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'form-item',
  props: {
    value: [String, Number],
    type: {
      type: String,
      default: 'text',
    },
    label: {
      type: String,
      default: '',
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    blur() {
      this.$refs.input && this.$refs.input.blur();
    },
    onBlur(event) {
      this.focused = false;
      this.$emit('blur', event);
    },
    onKeypress(event) {
      if (this.type === 'number') {
        const { keyCode } = event;
        const allowPoint = String(this.value).indexOf('.') === -1;
        const isValidKey = (keyCode >= 48 && keyCode <= 57) || (keyCode === 46 && allowPoint) || keyCode === 45;
        if (!isValidKey) {
          event.preventDefault();
        }
      }

      if (this.type === 'search' && event.keyCode === 13) {
        this.blur();
      }

      this.$emit('keypress', event);
    },
    onInput(event) {
      this.$emit('input', event.target.value);
    },

    onFocus(event) {
      this.focused = true;
      this.$emit('focus', event);

      // hack for safari
      if (this.readonly) {
        this.blur();
      }
    },
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.onInput,
        keypress: this.onKeypress,
        focus: this.onFocus,
        blur: this.onBlur,
      };
    },
  },
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
@import '../../assets/style/common';

.form-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #fff;
  padding: 10px;
  font-size: 17px;
  border-bottom: 1px solid #b1adad57;
  .form-item-label {
    margin-right: 20px;
    min-width: 55px;
  }
  .form-item-input {
    input {
      border: 0;
    }
  }
}
</style>
