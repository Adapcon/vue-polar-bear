<template>
  <section class="text-container">
    <PbTextArea
      v-model="textValue"
      :rows="5"
      :disabled="onlyShow || entitySchema.dynamic"
      :placeholder="entitySchema.placeholder"
      :validator="entitySchema.validator"
    />
  </section>
</template>

<script>
import PbTextArea from '../../../Inputs/TextArea/TextArea.vue';

export default {
  name: 'TextField',

  components: {
    PbTextArea,
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
    textValue: {
      get() {
        return this.value || this.entitySchema.defaultValue;
      },
      set(newTextValue) {
        this.$emit('input', newTextValue);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.text-container{
}
</style>
