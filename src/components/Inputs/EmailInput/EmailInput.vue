<template>
  <div class="pb-email-input-container">
    <input
      v-model="emailInput"
      class="pb"
      :class="inputTypeClass"
      :style="inputTypeStyle"
      style="width: 100%;"
      :placeholder="placeholder"
      :disabled="disabled"
      type="email"
      @blur="validateEmail"
      @focus="updateValidationFiled"
    >
    <p v-if="state.message" class="pb error-text">
      {{ state.message }}
    </p>
  </div>
</template>

<script>
import { validateColor } from '@pb/utils/validator';

export default {
  name: 'PbEmailInput',
  props: {
    required: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    value: { type: String, default: '' },
    color: { type: String, default: 'gray-20', validator: color => validateColor(color) },
    placeholder: { type: String, default: '' },

    inputStyle: {
      type: String,
      default: 'outline',
      validator: style => [
        'regular',
        'outline',
      ].includes(style),
    },
  },

  data() {
    return {
      state: {
        validation: true,
        message: '',
      },
    };
  },

  computed: {
    inputTypeStyle() {
      if (this.inputStyle === 'regular') return;
      return {
        ...(this.state.validation
          ? { border: `1px solid var(--color-${this.color})` }
          : ''),
      };
    },

    inputTypeClass() {
      const errorClass = this.inputStyle === 'regular' ? 'error' : 'error-outline';
      return !this.state.validation ? errorClass : '';
    },

    emailInput: {
      get() {
        return this.value;
      },

      set(email) {
        this.$emit('input', email);
        // this.validateEmail();
      },
    },
  },

  mounted() {
    if (this.emailInput)
      this.validateEmail();
  },

  methods: {
    validateEmail() {
      let errorMessage = '';

      if (this.required && (!this.emailInput || this.emailInput.length <= 0))
        errorMessage = 'Este campo é obrigatório!';
      else if (this.emailInput.length < 6)
        errorMessage = 'Este campo precisa ter no mínimo 6 dígitos!';
      else if (!this.isEmail(this.emailInput))
        errorMessage = 'Informe um email válido.';

      this.updateValidationFiled({ message: errorMessage });
    },

    isEmail(emailValidation) {
      // eslint-disable-next-line no-useless-escape
      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailValidation);
    },

    updateValidationFiled({ message }) {
      this.state.validation = !message;
      this.state.message = message || '';

      this.$emit('validation', {
        validation: this.state.validation,
        message: this.state.message,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .pb-email-input-container {

    .error {
      animation: shake 0.08s 3;
    }

    .error-outline {
      border: 1px solid var(--color-danger);
      animation: shake 0.08s 3;
    }

    .error-text {
      height: 16px;
      font-size: 12px !important;
      padding: 3px;
      color: var(--color-danger);
    }
  }
</style>
