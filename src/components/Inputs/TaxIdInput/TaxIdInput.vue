<template>
  <div class="pb-document-input-container">
    <input
      v-model="taxIdInput"
      class="pb"
      style="width: 100%"
      :class="taxIdInputClass"
      :style="taxIdInputStyle"
      :placeholder="taxIdInputPlaceholder"
      :maxlength="maxLength"
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
  name: 'PbTaxIdInput',

  props: {
    required: { type: Boolean, default: false },
    value: { type: String, default: '' },
    background: { type: String, default: 'transparent' },
    color: { type: String, default: 'gray-20', validator: validateColor },
    allowedDocuments: {
      type: Array,
      default: () => ['cnpj'],
      validator: documentType => {
        const allowedDocuments = ['cnpj', 'cpf'];
        return documentType.every(item => allowedDocuments.includes(item));
      },
    },
    placeholder: { type: String, default: '__.___.___/____-__' },
  },

  data() {
    return {
      state: {
        isValidDocument: true,
        message: '',
        inputValue: '',
      },
    };
  },

  computed: {
    taxIdInputClass() {
      return !this.state.isValidDocument ? 'error' : '';
    },

    taxIdInputStyle() {
      return {
        background: `var(--color-${this.background})`,
        border: `1px solid var(--color-${this.state.isValidDocument ? this.color : 'danger'})`,
      };
    },

    taxIdInputPlaceholder() {
      const documentPlaceholders = {
        cpf: '___.___.___-__',
        cnpj: '__.___.___/____-__',
      };

      if (!this.placeholder && this.allowedDocuments.length === 1)
        return documentPlaceholders[this.allowedDocuments[0]];

      return this.placeholder;
    },

    maxLength() {
      const documentsTypeMaxLength = {
        cnpj: 18,
        cpf: 14,
      };

      const maxLength = this.allowedDocuments.map(documentType => documentsTypeMaxLength[documentType]);

      return Math.max(...maxLength);
    },

    setLengthValidator() {
      const documentLength = [];

      if (this.allowedDocuments.includes('cnpj')) documentLength.push('14');

      if (this.allowedDocuments.includes('cpf')) documentLength.push('11');

      const lengthValidatorGenerate = this.allowedDocuments.map((doc, index) => {
        if (index === this.allowedDocuments.length - 1)
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
        if (this.allowedDocuments.includes('cpf') && this.allowedDocuments.includes('cnpj'))
          errorMessage = !validationTypes.cpf() || !validationTypes.cnpj() ? '' : 'O documento informado não é válido!';
        else if (this.allowedDocuments.includes('cpf'))
          errorMessage = validationTypes.cpf();
        else if (this.allowedDocuments.includes('cnpj'))
          errorMessage = validationTypes.cnpj();
      }

      this.updateValidationFiled({ message: errorMessage });
    },

    updateValidationFiled({ message }) {
      this.state.isValidDocument = !message;
      this.state.message = message || '';

      this.$emit('validation', {
        isValidDocument: this.state.isValidDocument,
        message: this.state.message,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.pb-document-input-container {
  .error {
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
