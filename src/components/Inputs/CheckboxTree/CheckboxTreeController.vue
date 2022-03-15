<template>
  <section class="pb-checkbox-tree-controller-container">
    <div
      class="checkbox"
      :style="`${isColumn ? 'flex-direction: column;' : ''}`"
    >
      <div
        v-for="settings in contentObject"
        :key="`selector-field-${settings.field}`"
        class="pb-row"
      >
        <CheckboxTree
          v-model="updateCheckValue[settings.field]"
          :field-settings="settings"
          :disabled="disabled"
          @input="newFieldValue => inputValue(newFieldValue, settings.field)"
        />
      </div>
    </div>
  </section>
</template>

<script>
import CheckboxTree from './CheckboxTree.vue';

export default {
  name: 'CheckboxTreeController',

  components: {
    CheckboxTree,
  },

  props: {
    fieldsSettings: { type: Object, default: () => ({}) },
    isColumn: { type: Boolean, default: false },
    value: {
      type: [Object, Array, String, Number, Boolean],
      default: () => ({}),
    },
    disabled: { type: Boolean, default: false },
  },

  data() {
    return {};
  },

  computed: {
    contentObject() {
      const contentObject = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const field in this.fieldsSettings.contentObject) {
        if (Object.hasOwnProperty.call(this.fieldsSettings.contentObject, field)) {
          const fieldSettings = this.fieldsSettings.contentObject[field];

          const fieldSettingsUpdated = this.objectIterator(fieldSettings);

          contentObject.push({ ...fieldSettingsUpdated, field });
        }
      }

      return contentObject.sort((constructorObject1, constructorObject2) => (
        !constructorObject1.position || constructorObject1.position > constructorObject2.position ? 1 : -1
      ));
    },

    updateCheckValue: {
      get() {
        return this.value;
      },

      set(value) {
        this.$emit('input', value);
      },
    },
  },

  methods: {
    inputValue(newFieldValue, index) {
      if (this.disabled) return;

      if (!newFieldValue)
        delete this.updateCheckValue[index];
      else this.updateCheckValue[index] = newFieldValue;
    },

    objectIterator(fieldSettings) {
      let fieldSettingsUpdated = { ...fieldSettings };

      if (fieldSettings.type === 'object')
        fieldSettingsUpdated.type = 'selector';
      else if (fieldSettings.type === 'object-keys')
        fieldSettingsUpdated.type = 'selector';
      else if (fieldSettings.type === 'array')
        fieldSettingsUpdated = this.objectIterator(fieldSettings.contentArray);
      else fieldSettingsUpdated.type = 'boolean';

      return fieldSettingsUpdated;
    },
  },
};
</script>

<style lang="scss" scoped>
.pb-checkbox-tree-controller-container {
  .checkbox {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    align-content: center;
    padding-top: 20px;
  }
}
</style>
