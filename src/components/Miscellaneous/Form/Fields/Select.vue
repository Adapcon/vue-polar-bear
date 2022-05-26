<template>
  <section class="select-container">
    <PbSelect
      color="secondary"
      :options="selectOptions"
      :button-label="selectedLabel"
      :disabled="onlyShow || entitySchema.dynamic"
      :keep-open-after-select="false"
      allow-search
      @click="updateSelection"
    />
  </section>
</template>

<script>
import PbSelect from '../../../Inputs/Select/Select.vue';

export default {
  name: 'SelectField',

  components: {
    PbSelect,
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
    selectValue: {
      get() {
        return this.value || this.entitySchema.defaultValue;
      },
      set(newSelectValue) {
        this.$emit('input', newSelectValue);
      },
    },

    selectedLabel() {
      if (this.selectValue) {
        const valueIndex = this.entitySchema.enabledValue.lastIndexOf(this.selectValue);
        return this.entitySchema.labelValue[valueIndex];
      }
      return 'Selecionar';
    },

    selectOptions() {
      return this.entitySchema.enabledValue.map((key, index) => ({
        title: this.entitySchema.labelValue[index] || key,
        value: key,
      }));
    },
  },

  methods: {
    updateSelection(optionSelected) {
      this.selectValue = optionSelected.option.value;
    },

    validateRequired() {
      return !!this.selectValue;
    },
  },
};
</script>

<style lang="scss" scoped>
.select-container{
}
</style>
