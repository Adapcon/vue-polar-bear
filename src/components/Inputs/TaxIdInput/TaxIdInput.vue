<template>
  <div class="pb-document-input-container">
    <input
      v-model="taxIdInput"
      class="pb"
      style="width: 100%"
      :class="validationClass"
      :style="taxIdInputStyle"
      :placeholder="setInputPlaceholder"
      :maxlength="getMaxLength(inputType)"
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
import { documentPlaceholders } from '@pb/utils/inputDocumentTypes';
import { isCpf, isCnpj } from 'adapcon-utils-js';

export default {
  name: 'PbTaxIdInput',

  props: {
    required: { type: Boolean, default: false },
    value: { type: String, default: '' },
    background: { type: String, default: 'transparent' },
    color: { type: String, default: 'gray-20', validator: validateColor },
    inputType: {
      type: Array,
      default: () => ['cnpj'],
    },
    placeholder: { type: String, default: '__.___.___/____-__' },
  },

  data() {
    return {
      state: {
        validation: true,
        message: '',
        inputValue: '',
      },
    };
  },

  computed: {
    validationClass() {
      return !this.state.validation ? 'error' : '';
    },
    taxIdInputStyle() {
      return {
        ...(this.state.validation
          ? {
            background: `var(--color-${this.background})`,
            border: `1px solid var(--color-${this.color})`,
          }
          : { background: `var(--color-${this.background})` }),
      };
    },

    setInputPlaceholder() {
      if (!this.placeholder && this.inputType.length <= 1)
        return documentPlaceholders[this.inputType[0]];

      return this.placeholder;
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

    taxIdInput: {
      get() {
        return this.state.inputValue.length <= 11
          ? this.stringToCpfFormat(this.state.inputValue)
          : this.stringToCnpjFormat(this.state.inputValue);
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

  watch: {
    value() {
      this.state.inputValue = String(this.value);
    },
  },

  mounted() {
    if (this.taxIdInput) this.validateDocument();
  },

  methods: {
    getMaxLength(type) {
      const maxLength = {
        cnpj: 18,
        cpf: 14,
      };

      const types = type.map(item => maxLength[item]);

      return Math.max(...types);
    },

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

    validateDocument() {
      const documentToValidate = this.taxIdInput
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '')
        .trim();

      const validationTypes = {
        required: () => {
          if (
            this.required
            && (!documentToValidate || documentToValidate.length === 0)
          )
            return 'Este campo é obrigatório!';
        },
        lengthValidator: () => {
          if (documentToValidate.length && eval(this.setLengthValidator))
            return 'O documento informado não é válido!';
        },
        cpf: () => {
          if (!isCpf(documentToValidate)) return 'O CPF é inválido!';
        },
        cnpj: () => {
          if (!isCnpj(documentToValidate)) return 'O CNPJ é inválido!';
        },
      };

      let errorMessage = '';

      errorMessage = errorMessage
        || validationTypes.lengthValidator()
        || validationTypes.required();

      if (documentToValidate.length) {
        if (this.inputType.includes('cpf') && this.inputType.includes('cnpj'))
          errorMessage = !validationTypes.cpf() || !validationTypes.cnpj() ? '' : 'O documento informado não é válido!';
        else if (this.inputType.includes('cpf'))
          errorMessage = validationTypes.cpf();
        else if (this.inputType.includes('cnpj'))
          errorMessage = validationTypes.cnpj();
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
