<template>
  <div
    class="pb-text-input-container"
    :class="{
      'pb-input-error': state.hasError,
      'pb-input-disabled': disabled,
      [`pb-input-${color}`]: true,
    }"
    :style="textInputStyle"
  >
    <input
      ref="input"
      v-model="inputValue"
      class="pb"
      :disabled="disabled"
      :placeholder="placeholder"
      @blur="loseFocus"
    >

    <p
      v-if="maxLength"
      class="pb-strong counter"
    >
      <span>
        {{ inputValue.length }} / {{ maxLength }}
      </span>
    </p>
  </div>
</template>

<script>
import { validateColor } from '@pb/utils/validator';

export default {
  name: 'PbTextInput',

  props: {
    value: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    validator: { type: Function, default: null },
    background: { type: String, default: 'transparent' },
    borderColor: { type: String, default: 'gray-20', validator: validateColor },
    color: { type: String, default: 'gray-20', validator: validateColor },
    focus: { type: Boolean, default: false },
    maxLength: { type: Number, default: null },
  },

  data() {
    return {
      state: {
        hasError: false,
      },
    };
  },

  computed: {
    textInputStyle() {
      return { background: `var(--color-${this.background})`, border: `1px solid var(--color-${this.borderColor})` };
    },

    inputValue: {
      get() {
        return this.value;
      },

      set(val) {
        this.internalValidator(val);

        this.$emit('input', val);
      },
    },
  },

  watch: {
    focus(newValue) {
      if (newValue) this.focusInput();
    },
  },

  mounted() {
    if (this.value) this.internalValidator(this.value);
    if (this.focus) this.focusInput();
  },

  methods: {
    focusInput() {
      this.$refs.input.focus();
    },

    loseFocus() {
      this.$emit('focus', false);
    },

    internalValidator(val) {
      if (this.validator && !this.validator(val)) {
        this.state.hasError = true;
        return false;
      }

      if (this.maxLength && val.length > this.maxLength) {
        this.state.hasError = true;
        return false;
      }

      this.state.hasError = false;
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
.pb-text-input-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 40px;

  input {
    border-radius: 20px;
    width: 100%;
    background: transparent;
    outline: none;
  }

  .counter {
    white-space: nowrap;
    padding-right: 10px;
    color: var(--color-gray-20);
  }

}
.pb-input-error {
  border: 1px solid var(--color-danger) !important;
}

.pb-input-disabled {
  opacity: 0.3 !important;
}

@import "@pb/variables.scss";
@each $color in $colors {
  .pb-input-#{$color} {
    input {
      color: var(--color-#{$color});
  
      &::placeholder {
        color: var(--color-#{$color});
      }
    }
  }
}
</style>
