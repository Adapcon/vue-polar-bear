<template>
  <section class="boolean-container">
    <PbToggleSwitch
      v-model="booleanValue"
      :disabled="onlyShow || entitySchema.dynamic"
      :placeholder="entitySchema.placeholder"
      :validator="entitySchema.validator"
    />
  </section>
</template>

<script>
import PbToggleSwitch from '../../../Inputs/ToggleSwitch/ToggleSwitch.vue';

export default {
  name: 'BooleanField',

  components: {
    PbToggleSwitch,
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
    booleanValue: {
      get() {
        return this.value || this.entitySchema.defaultValue;
      },
      set(newBooleanValue) {
        this.$emit('input', newBooleanValue);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.boolean-container{
}
</style>
