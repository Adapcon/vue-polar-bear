<template>
  <div class="pb-text-input-container">
    <input
      ref="input"
      v-model="inputValue"
      class="pb"
      :class="{
        'pb-input-error' : state.hasError,
        'pb-input-disabled' : disabled,
        [`pb-input-${color}`]: true,
      }"
      :disabled="disabled"
      :placeholder="placeholder"
      @blur="loseFocus"
    >
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

    color: { type: String, default: 'muted', validator: validateColor },

    focus: { type: Boolean, default: false },
  },

  data() {
    return {
      state: {
        hasError: false,
      },
    };
  },

  computed: {
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
      if (newValue)
        this.focusInput();
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

      this.state.hasError = false;
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
.pb-text-input-container {
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
