<template>
  <div class="pb-document-input-container">
    <input
      v-model="documentInput"
      class="pb"
      style="width: 100%"
      :class="!state.validation ? 'error' : ''"
      :style="documentInputStyle"
      placeholder="__.___.___/____-__"
      :maxlength="getMaxLength"
      @blur="validateDocument"
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
import { isCpf, isCnpj } from 'adapcon-utils-js';

export default {
  name: 'PbDocumentInput',

  props: {
    required: { type: Boolean, default: false },
    value: { type: String, default: '' },
    background: { type: String, default: 'transparent' },
    color: { type: String, default: 'gray-20', validator: validateColor },
    inputType: { type: Array, default: () => ['cnpj'] },
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
    documentInputStyle() {
      return {
        ...(this.state.validation
          ? {
            background: `var(--color-${this.background})`,
            border: `1px solid var(--color-${this.color})`,
          }
          : { background: `var(--color-${this.background})` }),
      };
    },

    getMaxLength() {
      if (this.inputType.includes('cnpj')) return '18';

      if (this.inputType.includes('cpf')) return '14';

      return '18';
    },

    documentInput: {
      get() {
        const documentToString = String(this.value);
        return documentToString.length <= 11
          ? this.stringToCpfFormat(documentToString)
          : this.stringToCnpjFormat(documentToString);
      },

      set(document) {
        const formatDocumentValue = document
          .replace(/[^\w\s]/gi, '')
          .replace(/\s+/g, '')
          .trim();
        this.$emit('input', formatDocumentValue);
      },
    },
  },

  mounted() {
    if (this.documentInput)
      this.validateDocument();
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

    stringToCpfFormat(cpf) {
      cpf = cpf.replace(/\D/g, '');
      cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
      cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
      cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      return cpf;
    },

    setLengthValidator() {
      const documentLength = [];

      if (this.inputType.includes('cnpj')) documentLength.push('14');

      if (this.inputType.includes('cpf')) documentLength.push('11');

      const lengthValidatorGenerate = this.inputType.map((doc, index) => {
        if (index === this.inputType.length - 1)
          return `documentToValidate.length !== ${documentLength[index]}`;
        return `documentToValidate.length !== ${documentLength[index]} &&`;
      });

      return lengthValidatorGenerate.join(' ');
    },

    documentTypeValidators() {
      const validations = this.inputType.map((doc, index) => {
        const capitalize = doc.charAt(0).toUpperCase() + doc.slice(1);

        if (index === this.inputType.length - 1)
          return `!is${capitalize}(documentToValidate)`;
        return `!is${capitalize}(documentToValidate) &&`;
      });

      return validations.join(' ');
    },

    validateDocument() {
      let errorMessage = '';

      const documentToValidate = this.documentInput
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '')
        .trim();

      if (!documentToValidate || documentToValidate.length === 0) {
        errorMessage = 'Este campo é obrigatório!';
      } else if (eval(this.setLengthValidator())) {
        errorMessage = 'O documento informado não é válido!';
      } else if (this.inputType.includes('cpf') && this.inputType.includes('cnpj')) {
        !isCpf(documentToValidate) && !isCnpj(documentToValidate)
          ? (errorMessage = 'O documento é inválido!')
          : (errorMessage = '');
      } else if (this.inputType.includes('cpf') && !this.inputType.includes('cnpj')) {
        !isCpf(documentToValidate)
          ? (errorMessage = 'O CPF é inválido!')
          : (errorMessage = '');
      } else if (!this.inputType.includes('cpf') && this.inputType.includes('cnpj')) {
        !isCnpj(documentToValidate)
          ? (errorMessage = 'O CNPJ é inválido!')
          : (errorMessage = '');
      }

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
.pb-document-input-container {
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
