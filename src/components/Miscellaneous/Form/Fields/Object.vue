<template>
  <section class="object-container">
    <Form
      ref="form"
      :value="objectValue"
      :entity-schema="entitySchema.contentObject"
      :only-show="onlyShow || entitySchema.dynamic"
      @input.native="updateObject"
    />
  </section>
</template>

<script>
import Form from '../Form.vue';

export default {
  name: 'ObjectField',

  components: {
    Form,
  },

  props: {
    entitySchema: { type: Object, default: () => ({}) },
    onlyShow: { type: Boolean, default: false },
    value: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    objectValue() {
      return this.value || this.entitySchema.defaultValue || {};
    },
  },

  methods: {
    updateObject() {
      const objectForm = this.$refs.form;
      this.$emit('input', objectForm.formResponse);
    },
  },
};
</script>

<style lang="scss" scoped>
.object-container {
  border-left: solid 1px var(--color-gray-10);
  border-radius: 0 10px;
}
</style>
