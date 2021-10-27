<template>
  <div class="pb-text-area-container">
    <textarea
      ref="input"
      v-model="inputValue"
      :rows="rows"
      class="pb"
      :class="{
        'pb-area-error' : state.hasError,
        'pb-area-disabled' : disabled,
        [`pb-area-${color}`]: true,
      }"
      :disabled="disabled"
      :placeholder="placeholder"
      @blur="loseFocus"
    />
  </div>
</template>

<script>
import { validateColor } from '@pb/utils/validator';

export default {
  name: 'PbTextArea',

  props: {
    value: { type: String, default: '' },

    placeholder: { type: String, default: '' },

    disabled: { type: Boolean, default: false },

    validator: { type: Function, default: null },

    color: { type: String, default: 'muted', validator: validateColor },

    focus: { type: Boolean, default: false },

    rows: { type: Number, default: 3 },
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
.pb-text-area-container {
  padding: 10px;
  input {
    border-radius: 20px;
    width: 100%;
    background: transparent;
  }

  .pb-area-error {
    border: 1px solid var(--color-danger) !important;
  }

  .pb-area-disabled {
    opacity: 1 !important;
  }

  @import '@pb/variables.scss';
  @each $color in $colors {
    .pb-area-#{$color} {
      border: 1px solid var(--color-#{$color});
      color: var(--color-#{$color});

      &::placeholder {
        color: var(--color-#{$color});
      }
    }
  }
}
</style>
