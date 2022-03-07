<template>
  <section class="datetime-container">
    <PbDateInput
      v-model="datetimeValue"
      :disabled="onlyShow || entitySchema.dynamic"
      :placeholder="entitySchema.placeholder"
      :validator="entitySchema.validator"
    />
  </section>
</template>

<script>
import PbDateInput from '../../../Inputs/DateInput/DateInput.vue';

export default {
  name: 'DatetimeField',

  components: {
    PbDateInput,
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
    datetimeValue: {
      get() {
        return this.value || this.entitySchema.defaultValue;
      },
      set(newDatetimeValue) {
        this.$emit('input', newDatetimeValue);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.datetime-container{
}
</style>
