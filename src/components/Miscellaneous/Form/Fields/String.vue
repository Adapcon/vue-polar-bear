<template>
  <section class="string-container">
    <PbTextInput
      v-model="stringValue"
      :placeholder="entitySchema.placeholder"
      :disabled="onlyShow || entitySchema.dynamic"
      :validator="entitySchema.validator"
    />
  </section>
</template>

<script>
import PbTextInput from '../../../Inputs/TextInput/TextInput.vue';

export default {
  name: 'StringField',

  components: {
    PbTextInput,
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
};
</script>

<style lang="scss" scoped>
.string-container{
}
</style>
