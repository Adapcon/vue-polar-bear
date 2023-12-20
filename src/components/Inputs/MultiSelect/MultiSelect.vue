<template>
  <div
    class="pb-multi-select-container layer-overlay"
    :disabled="disabled"
  >
    <button
      ref="button"
      :disabled="disabled || !options.length"
      :style="getSelectStyle"
      class="pb-multi-select-button"
      :class="componentButtonClass"
      :is-options-open="state.showOptions && !disabled"
      @click="toggleShowOptions"
      @keyup.space.prevent
    >
      <p class="pb button-label">
        <template v-if="error">
          <PbIcon
            icon="fas fa-exclamation-triangle fa-sm"
            class="error-icon"
          />

          <input
            ref="input"
            class="pb"
            :placeholder="getLabel"
            :title="getLabel"
          >
        </template>

        <template v-else>
          <div :title="getLabel" >
            {{ getLabel }}
          </div>
        </template>
      </p>

      <PbCollapseIcon
        style="position: absolute; right: 16px;"
        :is-icon-up="state.showOptions && options.length > 0"
        :color="`var(--color-${color})`"
        @click.stop.native="toggleShowOptions"
      />
    </button>

    <div
      v-if="options.length && state.showOptions && !disabled"
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
        </li>
        <li
          v-for="(option, index) of options"
          :key="`${option}||${index}`"
          :is-selected="selected.indexOf(option) >= 0"
          :title="option"
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
    label: { type: String, default: 'Selecionar' },
    options: { type: Array, default: () => [] },
    selectedOptions: { type: Array, default: () => [] },
    disabled: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
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

    componentButtonClass() {
      return `${this.state.componentClasses[this.inputStyle]?.button} ${this.disabled || this.error ? '' : 'input-hover'}`;
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

    getLabel() {
      const selectedOptions = this.selected;

      if (selectedOptions.length === 0) return this.label;

      if (selectedOptions.length === 1) return this.selected[0];

      return `${selectedOptions.length} itens selecionados`;
    },

    getSelectStyle() {
      if (this.error) return {
        color: `var(--color-${this.color})`,
        backgroundColor: `var(--color-transparent)`,
        borderColor: `var(--color-danger)`,
      }

      if (this.state.showOptions) return {
        color: `var(--color-${this.color})`,
        backgroundColor: `var(--color-transparent)`,
        borderColor: `#292D32`,
      }

      return {
        color: `var(--color-${this.color})`,
        backgroundColor: `var(--color-gray)`,
        borderColor: `#D6DBE0`,
      }
    }
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

      if (this.state.showOptions && this.$refs.input) {
        this.$nextTick(() => {
          this.$refs.input.focus();
        });
      }
    },

    updateSelectedOptions() {
      this.state.selectedOptions = [...this.selectedOptions];
    },

    updateSelection() {
      this.$emit('update:selected-options', this.selected);
    },

    selectOptionAll() {
      this.selected = this.state.allSelected ? [] : [...this.options];
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

  .error-icon {
    color: var(--color-danger);
    margin-right: 8px;
  }

  .input-hover:hover {
    background-color: var(--color-hover) !important;
    border: 1px solid var(--color-gray-10) !important;
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

    .button-label {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding-right: 16px;

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
        position: absolute;
        width: 100%;
      }

      li {
        &:nth-child(2) {
          margin-top: 47px;
        }
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

        &::v-deep .option {
          overflow: hidden;

          .check-box {
            min-width: 14px !important;
            min-height: 14px !important;
          }

          P {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        &:hover {
          background: var(--color-hover);
        }

        &[is-selected] {
          background: rgba(var(--color-primary-rgb), 0.1);
        }

        &::v-deep .pb-checkbox-container {
          display: block !important;
          flex-grow: 1 !important;
        }
      }
    }
  }
}
</style>
