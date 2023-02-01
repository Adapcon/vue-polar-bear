<template>
  <div class="pb-cnpj-input-container">
    <input
      v-model="cnpjInput"
      class="pb"
      style="width: 100%"
      :class="!state.validation ? 'error' : ''"
      :style="cnpjInputStyle"
      placeholder="__.___.___/____-__"
      maxlength="18"
      @blur="validateCnpj"
      @focus="updateValidationFiled"
    >
    <p
      v-if="state.message"
      class="pb error-text"
    >
      {{ state.message }}
    </p>
  </div>
</template>

<script>
import { validateColor } from '@pb/utils/validator';

export default {
  name: 'PbCnpjInput',

  props: {
    required: { type: Boolean, default: false },
    value: { type: String, default: '' },
    background: { type: String, default: 'transparent' },
    color: { type: String, default: 'gray-20', validator: validateColor },
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
    cnpjInputStyle() {
      return {
        ...(this.state.validation
          ? {
            background: `var(--color-${this.background})`,
            border: `1px solid var(--color-${this.color})`,
          }
          : { background: `var(--color-${this.background})` }),
      };
    },

    cnpjInput: {
      get() {
        const cnpjToString = String(this.value);
        return this.stringToCnpjFormat(cnpjToString);
      },

      set(cnpj) {
        const formatCnpjValue = cnpj
          .replace(/[^\w\s]/gi, '')
          .replace(/\s+/g, '')
          .trim();
        this.$emit('input', formatCnpjValue);
        // this.validateCnpj();
      },
    },
  },

  mounted() {
    if (this.cnpjInput) this.validateCnpj();
  },
  methods: {
    stringToCnpjFormat(cnpj) {
      cnpj = cnpj.replace(/\D/g, '');
      cnpj = cnpj.replace(/^(\d{2})(\d)/, '$1.$2');
      cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      cnpj = cnpj.replace(/\.(\d{3})(\d)/, '.$1/$2');
      cnpj = cnpj.replace(/(\d{4})(\d)/, '$1-$2');
      return cnpj;
    },
    validateCnpj() {
      let errorMessage = '';

      const cnpjToValidate = this.cnpjInput.replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '')
        .trim();

      if (this.required && (!cnpjToValidate || cnpjToValidate.length === 0))
        errorMessage = 'Este campo é obrigatório!';
      else if (cnpjToValidate.length !== 14)
        errorMessage = 'Este campo precisa ter 14 dígitos!';
      else if (!this.isCnpj(cnpjToValidate))
        errorMessage = 'Informe um CNPJ válido!';

      this.updateValidationFiled({ message: errorMessage });
    },

    isCnpj(cnpjValidation) {
      // Captura os primeiros 12 números do CNPJ
      const firstNumbers = cnpjValidation.substr(0, 12);
      // Faz o primeiro cálculo
      const calc1 = this.calcDigitsPositionsCnpj(firstNumbers, 5);
      // O segundo cálculo é a mesma coisa do primeiro, porém, começa na posição 6
      const calc2 = this.calcDigitsPositionsCnpj(calc1, 6);
      // Concatena o segundo dígito ao CNPJ
      const cnpj = calc2;
      // Verifica se o CNPJ gerado é idêntico ao enviado
      if (cnpj === cnpjValidation) return true;
      return false;
    },

    calcDigitsPositionsCnpj(newDigits, positionsParameter, sumDigitsParameter) {
      const digits = newDigits.toString();
      let sumDigits = sumDigitsParameter || 0;
      let positions = positionsParameter || 10;

      for (let i = 0; i < digits.length; i++) {
        sumDigits += digits[i] * positions;
        positions--;
        if (positions < 2) positions = 9;
      }
      sumDigits %= 11;
      if (sumDigits < 2) sumDigits = 0;
      else sumDigits = 11 - sumDigits;

      const cnpj = digits + sumDigits;
      return cnpj;
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
.pb-cnpj-input-container {
  .error {
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
