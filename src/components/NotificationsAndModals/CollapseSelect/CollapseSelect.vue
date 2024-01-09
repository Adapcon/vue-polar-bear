<template>
  <div class="pb-multi-select-container layer-overlay">
    <PbCollapse
      :show.sync="state.showCollapse"
      :button-label="label"
      :button-color="color"
      :body-height="getBodyHeight()"
      :is-mobile="isMobile"
    >
      <PbSearchInput
        v-if="allowSearch"
        v-model="state.searchValue"
        class="search-button"
      />

      <div :style="optionsStyle">
        <div
          v-for="option in getOptionsList()"
          :key="option"
        >
          <PbCheckbox
            :value="state.selectedOptions.indexOf(option) >= 0"
            :label="option"
            :color="color"
            :checked-color="color"
            class="option"
            @input="selectOption(option)"
          />
        </div>
      </div>

      <template #actions>
        <PbButton
          label="Cancelar"
          @click.native="closeSelection"
        />
        <PbButton
          label="Salvar"
          @click.native="updateSelection"
        />
      </template>
    </PbCollapse>
  </div>
</template>

<script>
import PbButton from '@pb/Buttons/Button/Button.vue';
import PbCheckbox from '@pb/Inputs/Checkbox/Checkbox.vue';
import PbCollapse from '@pb/NotificationsAndModals/Collapse/Collapse.vue';
import PbSearchInput from '@pb/FiltersAndSearch/SearchInput/SearchInput.vue';
import { validateColor } from '@pb/utils/validator';

export default {
  name: 'PbCollapseSelect',

  components: {
    PbButton,
    PbCheckbox,
    PbCollapse,
    PbSearchInput,
  },

  props: {
    label: { type: String, default: 'Selecionar' },
    allowSearch: { type: Boolean, default: true },
    displaySize: { type: Number, default: 5 },
    options: { type: Array, default: () => [] },
    selectedOptions: { type: Array, default: () => [] },
    color: {
      type: String,
      default: 'primary',
      validator: color => validateColor(color),
    },
    isMobile: { type: Boolean, default: false },
  },

  data() {
    return {
      state: {
        searchValue: '',
        showCollapse: false,
        selectedOptions: [],
      },
    };
  },

  computed: {
    optionsStyle() {
      return {
        height: `${this.getBodyHeight(true)}px`,
        overflow: 'auto',
        'margin-top': '15px',
        'margin-bottom': '15px',
      };
    },
  },

  watch: {
    selectedOptions() {
      this.updateSelectedOptions();
    },
  },

  mounted() {
    this.updateSelectedOptions();
  },

  methods: {
    updateSelectedOptions() {
      this.state.selectedOptions = [...this.selectedOptions];
    },

    getBodyHeight(onlyOptionsSize = false) {
      const optionHeight = 37;
      const searchButtonHeight = 40;
      const marginsHeight = 115;

      const size = this.options.length < this.displaySize ? this.options.length : this.displaySize;
      const optionsSize = optionHeight * size;

      if (onlyOptionsSize) return optionsSize;

      return optionsSize + marginsHeight + (this.allowSearch ? searchButtonHeight : 0);
    },

    closeSelection() {
      this.updateSelectedOptions();
      this.$set(this.state, 'showCollapse', false);
    },

    updateSelection() {
      this.$emit('update:selected-options', this.state.selectedOptions);
      this.$set(this.state, 'showCollapse', false);
    },

    getOptionsList() {
      if (!this.state.searchValue) return this.options;

      return this.options.filter(option => option.toLowerCase().includes(this.state.searchValue.toLowerCase()));
    },

    selectOption(option) {
      const index = this.state.selectedOptions.indexOf(option);

      if (index >= 0)
        this.state.selectedOptions.splice(index, 1);
      else this.state.selectedOptions.push(option);
    },
  },
};
</script>

<style lang="scss" scoped>
.pb-multi-select-container {

  .search-button {
    color: var(--color-gray-20);
    margin-bottom: 20px !important;
  }

  .option {
    margin-bottom: 15px;
  }

}

</style>
