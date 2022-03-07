<template>
  <section class="number-container">
    <PbNumberInput
      v-model="numberValue"
      :placeholder="entitySchema.placeholder"
      :disabled="onlyShow || entitySchema.dynamic"
      :validator="entitySchema.validator"
    />
  </section>
</template>

<script>
import PbNumberInput from '../../../Inputs/NumberInput/NumberInput.vue';

export default {
  name: 'NumberField',

  components: {
    PbNumberInput,
  },

  props: {
    entitySchema: { type: Object, default: () => ({}) },
    onlyShow: { type: Boolean, default: false },
    value: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    numberValue: {
      get() {
        return this.value || this.entitySchema.defaultValue;
      },
      set(newNumberValue) {
        this.$emit('input', newNumberValue);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.number-container{
}
</style>
