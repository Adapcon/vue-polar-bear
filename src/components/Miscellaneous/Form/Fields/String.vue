<template>
  <section class="string-container">
    <PbTextInput
      v-if="!entitySchema.contentString || entitySchema.contentString === 'default'"
      :ref="`${entitySchema.type}-${entitySchema.field}`"
      v-model="stringValue"
      :placeholder="entitySchema.placeholder"
      :disabled="onlyShow || entitySchema.dynamic"
      :validator="validateField"
    />
    <PbTaxIdInput
      v-if="entitySchema.contentString === 'cnpj'"
      v-model="stringValue"
      :inputType="['cnpj']"
      :disabled="onlyShow || entitySchema.dynamic"
      :required="entitySchema.required"
    />
    <PbEmailInput
      v-if="entitySchema.contentString === 'email'"
      v-model="stringValue"
      :placeholder="entitySchema.placeholder"
      :disabled="onlyShow || entitySchema.dynamic"
      :validator="entitySchema.validator"
    />
  </section>
</template>

<script>
import PbTextInput from '../../../Inputs/TextInput/TextInput.vue';
import PbEmailInput from '../../../Inputs/EmailInput/EmailInput.vue';
import PbTaxIdInput from '../../../Inputs/TaxIdInput/TaxIdInput.vue';

export default {
  name: 'StringField',

  components: {
    PbTextInput,
    PbEmailInput,
    PbTaxIdInput,
  },

  props: {
    entitySchema: { type: Object, default: () => ({}) },
    onlyShow: { type: Boolean, default: false },
    value: {
      type: String,
      default: '',
    },
  },

  computed: {
    stringValue: {
      get() {
        return this.value || this.entitySchema.defaultValue;
      },
      set(newStringValue) {
        this.$emit('input', newStringValue);
      },
    },
  },

  methods: {
    validateField(value) {
      if (this.entitySchema.required && !value) return false;
      if (this.entitySchema.validator) return this.entitySchema.validator(value);
      return true;
    },

    validateRequired() {
      return this.validateField(this.stringValue);
    },
  },
};
</script>

<style lang="scss" scoped>
.string-container{
}
</style>
