<template>
  <section class="check-group-container">
    <div
      v-for="(checkGroupKey, checkGroupIndex) in checkGroup.enabledValue"
      :key="checkGroupIndex"
      class="check-group-content pb-row"
    >
      {{ { ...defaultEntitySchema, ...{ name: checkGroupKey, label: checkGroup.labelValue[checkGroupIndex]} } }}
      <Form
        :ref="`form-check-group-${checkGroupIndex}`"
        :value="!!updateInput[checkGroupKey]"
        :entity-schema="{ ...defaultEntitySchema, ...{ name: checkGroupKey, label: checkGroup.labelValue[checkGroupIndex] }}"
        :only-show="onlyShow || entitySchema.dynamic"
        class="pb-col-10"
        @input.native="updateCheckGroup(checkGroupKey)"
      />
    </div>
  </section>
</template>

<script>
// "asd": { "type": "check-group", "name": "keyField", "label": "Name", "enabledValue": [ "1", "2", "3" ], "labelValue": [ "1", "2", "3" ] }
// "tst": { "type": "boolean", "name": "test", "label": "Teste", "required": true }
export default {
  name: 'ArrayField',

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
          required: true,
        },
      },
    };
  },

  computed: {
    checkGroup() {
      return this.entitySchema || [];
    },

    updateInput: {
      get() {
        return this.entitySchema || [];
      },

      set(value) {
        this.$emit('input', value);
      },
    },
  },

  methods: {
    updateCheckGroup(checkGroupIndex) {
      if (this.updateInput[checkGroupIndex])
        this.$delete(this.updateInput, checkGroupIndex);
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
  padding-left: 20px;
  border-left: solid 1px var(--color-gray-10);
  border-radius: 0 10px;

  .more-button {
    margin-left: calc(100% - 40px);
    margin-top: -15%;
  }

  .check-group-content {
    border: solid 1px var(--color-gray-90);
    border-radius: 10px;
    padding: 5px;
    margin: 5px;
  }

  .list-move, /* apply transition to moving elements */
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }

  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
}
</style>
