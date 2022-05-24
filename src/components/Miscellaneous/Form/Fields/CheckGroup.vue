<template>
  <section class="check-group-container">
    <div
      v-for="(checkGroupKey, checkGroupIndex) of checkGroup.enabledValue"
      :key="checkGroupIndex"
      class="check-group-content pb-row"
    >
      <Form
        :ref="`form-check-group-${checkGroupIndex}`"
        :value="getFieldValue(checkGroupKey)"
        :entity-schema="generateEntitySchema(checkGroupKey, checkGroupIndex)"
        :only-show="onlyShow || entitySchema.dynamic"
        class="pb-col-10"
        @input.native="updateCheckGroup(checkGroupKey)"
      />
    </div>
  </section>
</template>

<script>
export default {
  name: 'CheckGroupField',

  components: {
    Form: () => import('../Form.vue'),
  },

  props: {
    entitySchema: { type: Object, default: () => ({}) },
    onlyShow: { type: Boolean, default: false },
    value: {
      type: Array,
      default: () => {},
    },
  },

  data() {
    return {
      state: {
        defaultEntitySchema: {
          type: 'boolean',
          required: false,
        },
        fieldValue: {},
      },
    };
  },

  computed: {
    checkGroup() {
      return this.entitySchema || [];
    },

    updateInput: {
      get() {
        return this.value || [];
      },

      set(value) {
        this.$emit('input', value);
      },
    },
  },

  created() {
    if (!this.value)
      this.updateInput = [];
  },

  methods: {
    getFieldValue(checkGroupKey) {
      const fieldValue = this.updateInput.indexOf(checkGroupKey) > -1;
      const value = {};
      value[checkGroupKey] = fieldValue;

      return value;
    },
    generateEntitySchema(checkGroupKey, checkGroupIndex) {
      const labelValue = this.checkGroup?.labelValue || {};
      const newSchema = { name: checkGroupKey, label: labelValue[checkGroupIndex] || checkGroupKey };
      const entitySchema = {};
      entitySchema[checkGroupKey] = { ...this.state.defaultEntitySchema, ...newSchema };

      return entitySchema;
    },

    updateCheckGroup(checkGroupIndex) {
      if (this.updateInput.indexOf(checkGroupIndex) > -1)
        this.updateInput.splice(this.updateInput.indexOf(checkGroupIndex), 1);
      else this.updateInput.push(checkGroupIndex);
    },

    validateRequired() {
      let isValid = true;
      this.checkGroup.forEach((checkGroupEntity, checkGroupIndex) => {
        const reference = this.$refs[`form-check-group-${checkGroupIndex}`][0];
        if (reference.validateRequired && isValid)
          isValid = reference.validateRequired();
      });
      return isValid;
    },
  },
};
</script>

<style lang="scss" scoped>
.check-group-container {
  display: flex;
  flex-wrap: wrap;
  padding-left: 20px;
  border-left: solid 1px var(--color-gray-10);
  border-radius: 0 10px;

  .check-group-content {
    padding: 5px;
    margin: 5px;
  }
}
</style>
