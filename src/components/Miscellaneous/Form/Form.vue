<template>
  <section class="form-container">
    <PbFieldset
      v-for="(schema, property) in state.sortedSchema"
      :key="`form-${property}`"
      :title="schema.label"
      :required="schema.required"
      :info="schema.tip"
      style="padding: 15px;"
    >
    </PbFieldset>
  </section>
</template>

<script>
import PbFieldset from '../Fieldset/Fieldset.vue';

export default {
  name: 'PbForm',
  components: {
    PbFieldset,
  },

  props: {
    entitySchema: { type: Object, default: () => ({}) },
    onlyShow: { type: Boolean, default: false },
    value: { type: Object, default: () => ({}) },
  },

  data() {
    return {
      state: {
        formattedSchema: {},
        sortedSchema: [],
      },
    };
  },

  computed: {
    formResponse: {
      get() {
        return this.value || {};
      },
      set(newFormResponse) {
        this.$emit('input', newFormResponse);
      },
    },
  },

  created() {
    this.state.formattedSchema = this.formatSchemaProps(
      this.entitySchema,
    );
    this.state.sortedSchema = this.orderSchemaProps(
      this.state.formattedSchema,
    );
  },

  methods: {
    formatSchemaProps(entitySchema) {
      const schemaKeys = Object.keys(entitySchema);

      return schemaKeys.reduce((acc, key) => {
        const formattedSchema = acc;
        const entity = entitySchema[key];

        const formattedEntity = {
          ...entity,
          field: key,
          defaultValue: this.getDefaultValue(entity),
        };

        if (formattedEntity.occult)
          return formattedSchema;

        if (formattedEntity.type === 'object') {
          formattedEntity.contentObject = this.formatSchemaProps(
            formattedEntity.contentObject,
          );
        }

        if (formattedEntity.type === 'object-keys') {
          formattedEntity.contentObject = this.formatSchemaProps(
            { someKey: formattedEntity.contentObject },
          ).someKey;
        }

        if (formattedEntity.type === 'array') {
          formattedEntity.contentArray = this.formatSchemaProps(
            { contentArray: formattedEntity.contentArray },
          ).contentArray;
        }

        formattedSchema[key] = formattedEntity;
        return formattedSchema;
      }, {});
    },

    orderSchemaProps(entitySchema) {
      const bigNumber = 77 ** 7;
      return Object.values(entitySchema).sort(
        (propA, propB) => (propA.position || bigNumber) - (propB.position || bigNumber),
      );
    },

    getDefaultValue(propSchema) {
      if (propSchema.defaultValue) return propSchema.defaultValue;
      if (!propSchema.required) return;

      const defaultValues = {
        html: '',
        text: '',
        select: '',
        string: '',
        number: 0,
        datetime: 0,
        file: {},
        array: [],
        object: {},
        boolean: false,
        'object-keys': {},
        'custom-field': null,
      };
      return defaultValues[propSchema.type];
    },
  },
};
</script>

<style lang="scss" scoped>
.form-container {
  width: 95%;
}
</style>
