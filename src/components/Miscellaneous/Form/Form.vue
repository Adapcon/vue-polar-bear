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
      <HtmlField
        v-if="schema.type === 'html'"
        v-model="formResponse[schema.field]"
        :entity-schema="schema"
        :only-show="onlyShow"
      />
      <FileField
        v-if="schema.type === 'file'"
        v-model="formResponse[schema.field]"
        :entity-schema="schema"
        :only-show="onlyShow"
        :upload-file="uploadFile"
      />
      <ArrayField
        v-if="schema.type === 'array'"
        v-model="formResponse[schema.field]"
        :entity-schema="schema"
        :only-show="onlyShow"
      />
      <ObjectField
        v-if="schema.type === 'object'"
        v-model="formResponse[schema.field]"
        :entity-schema="schema"
        :only-show="onlyShow"
      />
      <SelectField
        v-if="schema.type === 'select'"
        v-model="formResponse[schema.field]"
        :entity-schema="schema"
        :only-show="onlyShow"
      />
      <ObjectKeysField
        v-if="schema.type === 'object-keys'"
        v-model="formResponse[schema.field]"
        :entity-schema="schema"
        :only-show="onlyShow"
      />
      <StringField
        v-if="schema.type === 'string'"
        v-model="formResponse[schema.field]"
        :entity-schema="schema"
        :only-show="onlyShow"
      />
      <NumberField
        v-if="schema.type === 'number'"
        v-model="formResponse[schema.field]"
        :entity-schema="schema"
        :only-show="onlyShow"
      />
      <TextField
        v-if="schema.type === 'text'"
        v-model="formResponse[schema.field]"
        :entity-schema="schema"
        :only-show="onlyShow"
      />
      <DatetimeField
        v-if="schema.type === 'datetime'"
        v-model="formResponse[schema.field]"
        :entity-schema="schema"
        :only-show="onlyShow"
      />
      <BooleanField
        v-if="schema.type === 'boolean'"
        v-model="formResponse[schema.field]"
        :entity-schema="schema"
        :only-show="onlyShow"
      />
      <slot
        v-if="schema.type === 'custom-field'"
        :value="formResponse[schema.field]"
        :name="schema.slotName"
        :entity-schema="schema"
        :only-show="onlyShow"
      />
    </PbFieldset>
  </section>
</template>

<script>
import PbFieldset from '../Fieldset/Fieldset.vue';

export default {
  name: 'PbForm',
  components: {
    PbFieldset,
    HtmlField: () => import('./Fields/Html.vue'),
    FileField: () => import('./Fields/File.vue'),
    ArrayField: () => import('./Fields/Array.vue'),
    ObjectField: () => import('./Fields/Object.vue'),
    SelectField: () => import('./Fields/Select.vue'),
    ObjectKeysField: () => import('./Fields/ObjectKeys.vue'),
    StringField: () => import('./Fields/String.vue'),
    NumberField: () => import('./Fields/Number.vue'),
    TextField: () => import('./Fields/Text.vue'),
    DatetimeField: () => import('./Fields/Datetime.vue'),
    BooleanField: () => import('./Fields/Boolean.vue'),
  },

  props: {
    entitySchema: { type: Object, default: () => ({}) },
    onlyShow: { type: Boolean, default: false },
    value: { type: Object, default: () => ({}) },
    uploadFile: {
      type: Function,
      default: parameters => {
        throw new Error('uploadFile function is not defined', parameters);
      },
    },
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
            formattedEntity.contentObject,
          );
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
