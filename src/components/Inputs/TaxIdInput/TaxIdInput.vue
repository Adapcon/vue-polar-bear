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
      :disabled="state.disabled"
      @blur="validateDocument"
      @focus="updateValidationField"
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
import { documentTypesData } from './documentTypes';

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
      // eslint-disable-next-line max-len
      validator: allowedDocuments => allowedDocuments.length
        && allowedDocuments.every(item => Object.keys(documentTypesData).includes(item)),
    },
    placeholder: { type: String, default: '__.___.___/____-__' },
  },

  data() {
    return {
      state: {
        isValidDocument: true,
        message: '',
        inputValue: '',
        disabled: false,
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
        border: `1px solid var(--color-${
          this.state.isValidDocument ? this.color : 'danger'
        })`,
      };
    },

    taxIdInputPlaceholder() {
      if (!this.placeholder && this.allowedDocuments.length === 1)
        return documentTypesData[this.allowedDocuments[0]].placeholder;

      return this.placeholder;
    },

    maxLength() {
      const maxLength = this.allowedDocuments.map(
        documentType => documentTypesData[documentType].formattedLength,
      );

      return Math.max(...maxLength);
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
    allowedDocuments() {
      const hasAllowedDocuments = this.allowedDocuments.length >= 1;

      this.updateValidationField({ message: !hasAllowedDocuments ? 'Informe um tipo de documento. Consulte a documentação do componente!' : '' });

      this.state.disabled = !hasAllowedDocuments;
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

    validateLength(documentToValidate) {
      // eslint-disable-next-line max-len
      const hasValidLength = this.allowedDocuments.some(
        documentType => documentToValidate.length === documentTypesData[documentType].length,
      );

      return hasValidLength;
    },

    validateDocument() {
      const documentToValidate = this.taxIdInput
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '')
        .trim();

      if (!this.required && !documentToValidate.length) return;

      const validations = {
        cpf: isCpf(documentToValidate),
        cnpj: isCnpj(documentToValidate),
      };

      if (!documentToValidate) {
        return this.updateValidationField({
          message: 'O documento é obrigatório!',
        });
      }

      if (!this.validateLength(documentToValidate)) {
        this.updateValidationField({
          message: 'O documento informado não é válido!',
        });
      }

      const isValidDocument = this.allowedDocuments.some(
        documentType => validations[documentType],
      );

      if (!isValidDocument) {
        return this.updateValidationField({
          message: 'O documento informado não é válido!',
        });
      }

      return this.updateValidationField({
        message: '',
      });
    },

    updateValidationField({ message }) {
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
