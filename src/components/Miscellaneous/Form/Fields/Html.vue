<template>
  <section class="html-container">
    <PbTextArea
      v-model="htmlValue"
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
  name: 'HtmlField',

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
    htmlValue: {
      get() {
        return this.value || this.entitySchema.defaultValue;
      },
      set(newHtmlValue) {
        this.$emit('input', newHtmlValue);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.html-container{
}
</style>
