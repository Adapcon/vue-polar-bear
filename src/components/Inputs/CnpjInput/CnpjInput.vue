<template>
  <div class="pb-cnpj-input-container">
    <TheMask
      v-model="cnpjInput"
      :mask="['##.###.###/####-##']"
      class="pb"
      style="width: 100%;"
      :class="
        !state.validation ? 'error' : ''
      "
      :style="{
        ...(state.validation ?
          { border: `1px solid var(--color-${color})`}
          : '')
      }"
      placeholder="__.___.___/____-__"
      @blur.native="validateCnpj"
      @focus.native="updateValidationFiled"
    />
    <p v-if="state.message" class="pb error-text">
      {{ state.message }}
    </p>
  </div>
</template>

<script>
import { TheMask } from 'vue-the-mask'

import { validateColor } from '@pb/utils/validator';

export default {
  name: 'PbCnpjInput',

  props: {
    required: { type: Boolean, default: false },
    value: { type: String, default: '' },
    color: { type: String, default: 'gray-20', validator: validateColor },
  },

  components: {
    TheMask,
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
    cnpjInput: {
      get() {
        return this.value;
      },

      set(cnpj) {
        this.$emit('input', cnpj);
        // this.validateCnpj();
      },
    },
  },

  mounted() {
    if (this.cnpjInput)
      this.validateCnpj();
  },
  methods: {
    validateCnpj() {
      let errorMessage = '';

      if (this.required && (!this.cnpjInput || this.cnpjInput.length === 0))
        errorMessage = 'Este campo é obrigatório!';
      else if (this.cnpjInput.length !== 14)
        errorMessage = 'Este campo precisa ter 14 dígitos!';
      else if (!this.isCnpj(this.cnpjInput))
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
        sumDigits += (digits[i] * positions);
        positions--;
        if (positions < 2)
          positions = 9;
      }
      sumDigits %= 11;
      if (sumDigits < 2)
        sumDigits = 0;
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
