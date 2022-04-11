<template>
  <section class="form-container">
    <PbFieldset
      v-for="(schema, property) in state.sortedSchema"
      v-show="showField(schema)"
      :key="`form-${property}`"
      :title="schema.label"
      :required="schema.required"
      :info="schema.tip"
      style="padding: 15px;"
    >
      <keep-alive>
        <component
          :is="state.fieldsList[schema.type]"
          :ref="`${schema.type}-${schema.field}`"
          v-model="formResponse[schema.field]"
          :entity-schema="schema"
          :only-show="onlyShow"
          :upload-file="uploadFile"
        />
      </keep-alive>
      <br>
    </PbFieldset>
  </section>
</template>

<script>
import { EntitySchemaUtils } from '../../utils/entitySchema';
import HtmlField from './Fields/Html.vue';
import FileField from './Fields/File.vue';
import ArrayField from './Fields/Array.vue';
import ObjectField from './Fields/Object.vue';
import SelectField from './Fields/Select.vue';
import ObjectKeysField from './Fields/ObjectKeys.vue';
import StringField from './Fields/String.vue';
import NumberField from './Fields/Number.vue';
import TextField from './Fields/Text.vue';
import DatetimeField from './Fields/Datetime.vue';
import BooleanField from './Fields/Boolean.vue';
import PbFieldset from '../Fieldset/Fieldset.vue';

export default {
  name: 'PbForm',

  components: {
    HtmlField,
    FileField,
    ArrayField,
    ObjectField,
    SelectField,
    ObjectKeysField,
    StringField,
    NumberField,
    TextField,
    DatetimeField,
    BooleanField,
    PbFieldset,
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
        fieldsList: {
          html: 'HtmlField',
          string: 'StringField',
          number: 'NumberField',
          boolean: 'BooleanField',
          text: 'TextField',
          'date-time': 'DatetimeField',
          file: 'FileField',
          array: 'ArrayField',
          object: 'ObjectField',
          select: 'SelectField',
          'object-keys': 'ObjectKeysField',
          'custom-field': 'CustomField',
        },
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
      Object.values(this.state.formattedSchema),
    );
  },

  methods: {
    validateRequired() {
      try {
        this.state.sortedSchema.forEach(element => {
          const reference = this.$refs[`${element.type}-${element.field}`];
          if (!reference) return;
          if (!reference[0]?.validateRequired) return;
          if (!reference[0].validateRequired()) throw new Error(`${element.field} is required!`);
        });
      } catch (error) {
        return false;
      }
      return true;
    },

    showField(schema) {
      const { showIf } = schema;
      if (!showIf) return true;

      try {
        showIf.forEach(validationObj => {
          const { field, value } = validationObj;

          const itemData = this.formResponse[field];

          if (itemData === value) throw new Error(`${field} is required to show!`);
        });
      } catch (error) {
        return true;
      }

      return false;
    },

    orderSchemaProps: EntitySchemaUtils.orderSchemaProps,
    formatSchemaProps: EntitySchemaUtils.formatSchemaProps,
  },
};
</script>

<style lang="scss" scoped>
.form-container {
  width: 95%;
}
</style>
