<template>
  <div
    class="pb-multi-select-container layer-overlay"
    :disabled="disabled"
  >
    <button
      ref="button"
      :disabled="disabled || !options.length"
      :style="{
        // color: `var(--color-${color})`,
      }"
      class="pb-multi-select-button"
      :class="componentButtonClass"
      :is-options-open="state.showOptions"
      @click="toggleShowOptions"
      @keyup.space.prevent
    >
      <p class="pb button-label">
        <template v-if="allowSearch">
          <PbIcon
            icon="fas fa-search fa-sm"
            class="search-icon"
          />

          <input
            ref="input"
            v-model="searchTermHandler"
            :placeholder="label"
          >
        </template>

        <template v-else>
          {{ label }}
        </template>
      </p>

      <PbCollapseIcon
        style="position: absolute; right: 16px;"
        :is-icon-up="state.showOptions && options.length > 0"
        @click.stop.native="toggleShowOptions"
      />
    </button>

    <div
      v-if="options.length && state.showOptions"
      class="options-container layer-overlay"
      :has-all-selected="state.allSelected"
    >
      <ul
        :class="`pb-scroll-${color}`"
        class="options-list"
      >
        <li class="select-all-option">
          <PbCheckbox
            :value="state.allSelected"
            :label="selectedLabel"
            :color="color"
            :checked-color="color"
            class="option"
            @input="selectOptionAll(option)"
          />

          <PbButton
            icon="fas fa-times"
            button-size="small"
            button-style="no-background"
            :color="color"
            @click.native="cleanSelection"
          />
        </li>
        <li
          v-for="(option, index) of filteredOptions"
          :key="`${option}||${index}`"
          :is-selected="selected.indexOf(option) >= 0"
        >
          <PbCheckbox
            :value="selected.indexOf(option) >= 0"
            :label="option"
            :color="color"
            :checked-color="color"
            class="option"
            @input="selectOption(option)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import PbButton from '@pb/Buttons/Button/Button.vue';
import PbCheckbox from '@pb/Inputs/Checkbox/Checkbox.vue';
import PbIcon from '@pb/Miscellaneous/Icon/Icon';
import PbCollapseIcon from '@pb/Miscellaneous/CollapseIcon/CollapseIcon';

import { validateColor, validateInputStyle } from '@pb/utils/validator';

export default {
  name: 'PbMultiSelect',

  components: {
    PbButton,
    PbCheckbox,
    PbIcon,
    PbCollapseIcon,
  },

  props: {
    allowSearch: { type: Boolean, default: true },
    label: { type: String, default: 'Selecionar' },
    options: { type: Array, default: () => [] },
    selectedOptions: { type: Array, default: () => [] },
    disabled: { type: Boolean, default: false },
    color: {
      type: String,
      default: 'primary',
      validator: color => validateColor(color),
    },
    inputStyle: {
      type: String,
      default: 'background-light',
      validator: style => validateInputStyle(style),
    },
  },

  data() {
    return {
      state: {
        searchValue: '',
        showOptions: false,
        selectedOptions: [],
        allSelected: false,
        componentClasses: {
          'background-light': {
            button: 'pb background-light',
            scrollBar: 'scroll-bar background-light',
          },
          'no-background': {
            button: 'pb no-background',
            scrollBar: 'scroll-bar',
          },
          outline: {
            button: 'pb outline',
            scrollBar: 'scroll-bar outline',
          },
        },
      },
    };
  },

  computed: {
    selectedLabel() {
      return this.selected.length === 1
        ? '1 item selecionado'
        : `${this.selected.length} itens selecionados`;
    },

    filteredOptions() {
      if (!this.options.length) return [];
      if (!this.searchTermHandler) return this.options;

      return this.options.filter(option => option.toLowerCase().includes(this.searchTermHandler.toLowerCase()));
    },

    componentButtonClass() {
      return this.state.componentClasses[this.inputStyle]?.button;
    },

    searchTermHandler: {
      get() {
        return this.state.searchValue;
      },

      set(value) {
        this.state.searchValue = value;
      },
    },

    selectedItemsLabel() {
      return this.state.allSelected ? this.selected.length - 1 : this.selected.length;
    },

    selected: {
      get() {
        return this.state.selectedOptions;
      },

      set(value) {
        this.state.selectedOptions = value;
        this.updateSelection();
      },
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
    toggleShowOptions() {
      if (this.disabled) return;

      this.state.showOptions = !this.state.showOptions;

      if (this.state.showOptions && this.allowSearch) {
        this.$nextTick(() => {
          this.$refs.input.focus();
        });
      }
    },

    cleanSelection() {
      this.selected = [];
    },

    updateSelectedOptions() {
      this.state.selectedOptions = [...this.selectedOptions];
    },

    closeSelection() {
      this.updateSelectedOptions();
      this.$set(this.state, 'showOptions', false);
    },

    updateSelection() {
      this.$emit('update:selected-options', this.selected);
    },

    selectOptionAll() {
      this.selected = this.state.allSelected ? [] : [...this.filteredOptions];
      this.state.allSelected = !this.state.allSelected;
    },

    selectOption(option) {
      const index = this.selected.indexOf(option);
      if (index >= 0)
        this.selected.splice(index, 1);
      else this.selected.push(option);
    },
  },
};
</script>

<style lang="scss" scoped>
.pb-multi-select-container {
  position: relative;
  width: 100%;

  &[disabled] {
    cursor: not-allowed !important;
    opacity: 0.5;
  }

  .pb-multi-select-button {
    text-transform: none !important;
    border-radius: 40px;
    padding: 0 16px;
    width: 100%;
    position: relative;
    height: 40px;
    text-align: left;
    white-space: nowrap;
    transition: border-radius 0.1s ease;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

    &[is-options-open] {
      border-radius: 20px 20px 0 0;
    }

    &:hover {
      background: var(--color-hover);
    }

    .button-label {
      input {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        background: none;
        font-size: 14px;
        color: #000;
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 0;
        margin: 0;
        cursor: pointer;
        user-select: none;
      }
    }
  }

  .background-light {
    background: var(--color-gray);
    border: 1px solid var(--color-gray-5);

    &[is-options-open] {
      background: none;
    }
  }

  .outline {
    background: none;
    border: 1px solid var(--color-gray-5);
  }

  .no-background {
    background: none;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid var(--color-gray-5);
  }

  .options-container {
    width: 100%;
    position: absolute;
    left: 0;
    top: 50px;
    border-radius: 0 0 8px 8px;
    // padding: 5px 0;
    padding-top: 0;
    box-shadow: 0px 2px 8px 0px rgb(82, 89, 91, 14%);
    overflow: hidden;

    &[has-all-selected] {
      border-radius: 0 0 20px 20px;
    }

    .options-list {
      .select-all-option {
        background: var(--color-gray);
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid var(--color-gray-5);
        padding: 12px;
      }
    }

    ul {
      width: 100%;
      height: 100%;
      max-height: 230px;
      overflow-y: scroll;
      list-style: none;
      margin: 0;
      padding: 0;
      user-select: none;

      &::-webkit-scrollbar {
        width: 2px;
      }
      &::-webkit-scrollbar-track {
        background: none;
      }

      li {
        display: flex;
        align-items: center;
        padding: 12px;
        cursor: pointer;

        &:hover {
          background: var(--color-hover);
        }

        &[is-selected] {
          background: rgba(var(--color-primary-rgb), 0.1);
        }

        &::v-deep .pb-checkbox-container {
          // padding: 5px 10px !important;
          display: block !important;
          flex-grow: 1 !important;
        }
      }
    }
  }
}
</style>
