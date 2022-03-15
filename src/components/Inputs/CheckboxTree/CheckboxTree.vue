<template>
  <section class="pb-checkbox-tree-container">
    <div v-if="!fieldSettings.start" style="display: flex;">
      <PbThreeStateCheckbox
        v-model="updateCheckValue"
        :label="fieldSettings.label"
        :disabled="disabled"
      />
      <PbIcon
        :icon="!isValuesBoolean ? 'fas fa-chevron-up' : 'fas fa-chevron-up fa-rotate-180'"
        style="margin-left: 15px;"
        @click.native="check()"
      />
    </div>

    <div v-if="!isValuesBoolean">
      <div
        v-for="(settings, index) in fieldSettings.contentObject"
        :key="`selector-field-${settings.field}${index}`"
        class="pb-row"
        style="padding-left: 20px;"
      >
        <checkbox-tree
          v-if="settings.contentObject"
          v-show="isValidToShow(index)"
          v-model="updateCheckValue[index]"
          :field-settings="settings"
          :disabled="disabled"
          @input="newFieldValue => inputValue(newFieldValue, index)"
        />

        <PbCheckbox
          v-else
          v-show="isValidToShow(index)"
          v-model="updateCheckValue[index]"
          :label="settings.label"
          :disabled="disabled"
          label-color="gray-20"
          @input="newFieldValue => inputValue(newFieldValue, index)"
        />
      </div>
    </div>
  </section>
</template>

<script>
import PbIcon from '@pb/Miscellaneous/Icon/Icon';
import PbThreeStateCheckbox from '@pb/Inputs/ThreeStateCheckbox/ThreeStateCheckbox.vue';
import PbCheckbox from '@pb/Inputs/Checkbox/Checkbox.vue';

export default {
  name: 'CheckboxTree',

  components: {
    PbCheckbox,
    PbThreeStateCheckbox,
    PbIcon,
  },

  props: {
    value: {
      type: [Object, Array, String, Number, Boolean],
      default: false,
    },

    fieldSettings: {
      type: Object,
      default: () => ({}),
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {};
  },

  computed: {
    isValuesBoolean() {
      return typeof this.updateCheckValue === 'boolean';
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
      if (newFieldValue === false)
        delete this.updateCheckValue[index];
      else this.$set(this.updateCheckValue, index, newFieldValue);
    },

    check() {
      if (this.disabled) return;

      if (typeof this.updateCheckValue === 'boolean') {
        this.updateCheckValue = {};
        return;
      }

      delete this.updateCheckValue;
    },

    isValidToShow(index) {
      if (this.disabled === false) return true;

      return this.disabled && !!this.updateCheckValue[index];
    },
  },
};
</script>

<style lang="scss" scoped>
  .pb-checkbox-tree-container { }
</style>
