<template>
  <div class="pb-number-input-container">
    <input
      id="text-box"
      ref="input"
      v-model="internalValue"
      :inputmode="disableSoftKeyboard ? 'none' : ''"
      type="number"
      class="pb"
      :class="{
        'pb-input-error' : state.hasError,
        'pb-input-disabled' : disabled,
        [`pb-input-${color}`]: true,
        'pb-input-center': textCenter,
      }"
      :style="styleUserSelect"
      :disabled="disabled"
      :placeholder="placeholder"
      @click="selectText ? selectAllText() : null"
      @blur="(val) => blur(Number(val.target.value))"
    >
  </div>
</template>

<script>
import { validateColor } from '@pb/utils/validator';

export default {
  name: 'PbNumberInput',

  props: {
    value: { type: Number, default: 0 },

    placeholder: { type: String, default: '' },

    disabled: { type: Boolean, default: false },

    selectText: { type: Boolean, default: false },

    disableSoftKeyboard: { type: Boolean, default: false },

    userSelect: { type: Boolean, default: false },

    validator: { type: Function, default: null },

    color: { type: String, default: 'gray-20', validator: validateColor },

    focus: { type: Boolean, default: false },

    inputTimeout: { type: Number, default: 0 },

    textCenter: { type: Boolean, default: false },
  },

  data() {
    return {
      state: {
        hasError: false,
        changeQuantity: null,
      },
    };
  },

  computed: {
    internalValue: {
      get() {
        return this.value;
      },

      set(newVal) {
        this.setValue(newVal);
      },
    },

    styleUserSelect() {
      return this.userSelect ? '-webkit-user-select: none !important; -ms-user-select: none !important; user-select: none !important; caret-color: transparent;' : '';
    },
  },

  watch: {
    focus(newValue) {
      if (newValue)
        this.focusInput();
    },
  },

  mounted() {
    if (this.value) this.internalValidator(this.value);
    if (this.focus) this.focusInput();
  },

  methods: {
    selectAllText() {
      const input = document.getElementById('text-box');
      input.focus();
      input.select();
    },
    blur(val) {
      this.loseFocus();
      this.$emit('blur', val);
    },

    focusInput() {
      this.$refs.input.focus();
    },

    loseFocus() {
      this.$emit('focus', false);
    },

    internalValidator(val) {
      const validations = [
        this.validator ? !this.validator(val) : false,
        Number.isNaN(val),
      ];

      this.state.hasError = validations.some(validator => validator);

      return !this.state.hasError;
    },

    setValue(val) {
      if (this.state.changeQuantity)
        clearTimeout(this.state.changeQuantity);

      const numberValue = typeof val === 'string' ? Number(val) : val;

      this.internalValidator(numberValue);

      this.state.changeQuantity = setTimeout(() => {
        clearTimeout(this.state.changeQuantity);

        return this.$emit('input', numberValue);
      }, this.inputTimeout);
    },
  },
};
</script>

<style lang="scss" scoped>
.pb-number-input-container {
  input {
    border-radius: 20px;
    width: 100%;
    background: transparent;
  }

  .pb-input-error {
    border: 1px solid var(--color-danger) !important;
  }

  .pb-input-disabled {
    opacity: 0.3 !important;
  }

  .pb-input-center {
    text-align: center;
  }

  @import '@pb/variables.scss';
  @each $color in $colors {
    .pb-input-#{$color} {
      border: 1px solid var(--color-#{$color});
      color: var(--color-#{$color});

      &::placeholder {
        color: var(--color-#{$color});
      }
    }
  }
}
</style>
