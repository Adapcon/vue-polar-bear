<template>
  <div class="pb-phone-input-container">
    <the-mask
      v-model="phoneInput"
      :mask="['(##) ####-####', '(##) #####-####']"
      :masked="false"
      class="pb"
      :class="inputTypeClass"
      :style="inputTypeStyle"
      style="width: 100%;"
      :disabled="disabled"
      placeholder="(__) _____ - ____"
      autocomplete="tel"
      @blur.native="validatePhone"
      @focus.native="updateValidationFiled"
    />
    <p v-if="state.message" class="pb error-text">
      {{ state.message }}
    </p>
  </div>
</template>

<script>
import { validateColor } from '@pb/utils/validator';

export default {
  name: 'PbPhoneInput',
  props: {
    required: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    value: { type: String, default: '' },
    color: { type: String, default: 'gray-20', validator: color => validateColor(color) },

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

    phoneInput: {
      get() {
        return this.value;
      },

      set(phone) {
        this.$emit('input', phone);
        // this.validatePhone();
      },
    },
  },

  mounted() {
    if (this.state.phone)
      this.validatePhone();
  },

  methods: {
    validatePhone() {
      let errorMessage = '';

      if (this.required && (!this.phoneInput || this.phoneInput.length === 0))
        errorMessage = 'Este campo é obrigatório!';
      else if (this.phoneInput.length < 10)
        errorMessage = 'Este campo precisa ter no mínimo 10 dígitos!';

      this.updateValidationFiled({ message: errorMessage });
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
  .pb-phone-input-container {

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
