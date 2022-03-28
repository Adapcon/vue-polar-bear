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
        :ref="`${schema.type}-${schema.field}`"
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
        v-if="schema.type === 'date-time'"
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
      let isValid = true;
      this.state.sortedSchema.forEach(element => {
        const reference = this.$refs[`${element.type}-${element.field}`][0];
        if (reference?.validateRequired && isValid)
          isValid = reference.validateRequired();
      });
      return isValid;
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
