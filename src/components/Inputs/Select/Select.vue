<template>
  <div
    v-click-outside="closeSelector"
    class="pb-select-wrapper"
  >
    <button
      ref="button"
      :disabled="disabled || !options.length"
      :style="buttonStyle"
      :class="buttonClasses"
      @click="buttonClickHandler"
      @keyup.space.prevent
    >
      <p class="pb button-label">
        <template v-if="allowSearch && state.isSelectorOpen">
          <PbIcon
            icon="fas fa-search"
            style="
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
            "
          />

          <input
            ref="input"
            v-model="searchTermHandler"
            :placeholder="buttonLabel"
            :class="{
              'placeholder-light': !isColorWhite && selectStyle !== 'outline',
            }"
          >
        </template>

        <template v-else>
          {{ buttonLabel }}
        </template>
      </p>

      <PbCollapseIcon
        style="position: absolute; top: 8px; right: 20px;"
        :color="collapseIconColor"
        :is-icon-up="state.isSelectorOpen && options.length > 0"
        @click.stop.native="toggleSelector"
      />
    </button>

    <div
      v-if="options.length && state.isSelectorOpen"
      class="options-container layer-overlay"
      :style="optionsStyle"
    >
      <ul :class="scrollBarClass">
        <li
          v-for="(option, index) of filteredOptions"
          :key="`${option.title}||${index}`"
          @click="selectOptionHandler({ option, index })"
        >
          <PbIcon
            v-if="optionsIcon"
            :icon="optionsIcon"
            style="margin-right: 10px;"
          />
          <p class="pb">
            {{ option.title }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import PbIcon from '@pb/Miscellaneous/Icon/Icon';
import PbCollapseIcon from '@pb/Miscellaneous/CollapseIcon/CollapseIcon.vue';

import { removeAccents } from '@pb/utils/text';
import { validateColor } from '@pb/utils/validator';
import { buttonStyles } from '@pb/utils/constants';

export default {
  name: 'PbSelect',

  components: {
    PbCollapseIcon,
    PbIcon,
  },

  props: {
    options: {
      type: Array,
      default: () => [],
    },
    color: {
      type: String,
      default: 'white',
      validator: color => validateColor(color),
    },
    selectStyle: {
      type: String,
      default: 'background',
      validator: style => buttonStyles.includes(style),
    },
    buttonLabel: { type: String, default: 'Selecione' },
    disabled: { type: Boolean, default: false },
    keepOpenAfterSelect: { type: Boolean, default: true },
    optionsIcon: { type: String, default: '' },
    allowSearch: { type: Boolean, default: false },
  },

  data() {
    return {
      state: {
        isSelectorOpen: false,
        searchTerm: '',
      },
    };
  },

  computed: {
    searchTermHandler: {
      get() {
        return this.state.searchTerm;
      },

      set(val) {
        this.state.searchTerm = val;
        this.$emit('update:searchTerm', val);
      },
    },

    filteredOptions() {
      if (!this.allowSearch)
        return this.options;

      const normalizedSearchTerm = this.removeAccents(this.state.searchTerm.trim().toLowerCase());

      return this.options.filter(option => {
        const normalizedTitle = this.removeAccents(option.title.trim().toLowerCase());
        return normalizedTitle.includes(normalizedSearchTerm);
      });
    },

    buttonStyle() {
      const colorStyle = this.buttonColor;

      const opacityStyle = this.disabled || !this.options.length
        ? { opacity: '0.75' }
        : { opacity: '1' };

      const borderStyle = !this.state.isSelectorOpen || !this.options.length
        ? { 'border-radius': '20px' }
        : { 'border-radius': '20px 20px 20px 0' };

      return { ...colorStyle, ...opacityStyle, ...borderStyle };
    },

    buttonColor() {
      const color = `var(--color-${this.color})`;

      const styleObject = {
        outline: {
          'border-color': color,
          color,
        },
        background: {
          background: color,
          color: this.colorToBeUsed('white'),
        },
      };

      return styleObject[this.selectStyle] || { color };
    },

    buttonClasses() {
      return {
        'pb-button-style-regular': this.selectStyle === 'regular',
        'pb-button-style-outline': this.selectStyle === 'outline',
        'pb-button-style-background': this.selectStyle === 'background',
      };
    },

    collapseIconColor() {
      if (this.selectStyle !== 'outline') {
        return this.isColorWhite
          ? 'var(--color-primary)'
          : 'var(--color-white)';
      }

      return `var(--color-${this.color})`;
    },

    optionsStyle() {
      return this.isColorWhite
        ? { background: 'var(--color-white)', color: 'var(--color-primary)' }
        : { background: `var(--color-${this.color})`, color: 'var(--color-white)' };
    },

    scrollBarClass() {
      return this.isColorWhite
        ? 'scrollbar-color-primary'
        : 'scrollbar-color-white';
    },

    isColorWhite() {
      return this.color === 'white';
    },
  },

  methods: {
    removeAccents,

    buttonClickHandler() {
      if (!this.allowSearch || !this.state.isSelectorOpen)
        this.toggleSelector();
    },

    toggleSelector() {
      if (this.disabled) return;
      return this.state.isSelectorOpen
        ? this.closeSelector()
        : this.openSelector();
    },

    closeSelector() {
      if (this.allowSearch)
        this.state.searchTerm = '';

      this.state.isSelectorOpen = false;
    },

    openSelector() {
      this.state.isSelectorOpen = true;

      if (this.allowSearch)
        this.$nextTick(() => this.$refs.input.focus());
    },

    selectOptionHandler({ option, index }) {
      if (!this.allowSearch) {
        this.$emit('click', { option, index });
      } else {
        this.$emit(
          'click',
          { option, index: this.options.findIndex(item => item === option) },
        );
      }

      if (!this.keepOpenAfterSelect)
        this.closeSelector();
    },

    colorToBeUsed(color) {
      return this.isColorWhite
        ? 'var(--color-primary)'
        : color;
    },
  },
};
</script>

<style lang="scss" scoped>
.pb-select-wrapper {
  position: relative;
  width: 100%;

  button {
    text-transform: none !important;
    background: none;
    border: none;
    outline: none;
    padding: 0 20px;
    width: 100%;
    position: relative;
    height: 40px;
    text-align: left;
    white-space: nowrap;
    transition: border-radius 0.1s ease;

    &.pb-button-style-regular {
      padding: 0 !important;
      height: auto;
      &:hover {
        color: var(--color-primary) !important;
      }
    }
    &.pb-button-style-outline {
      border: 1px solid;
    }

    input {
      width: 100%;
      padding-left: 24px;
      border: none;
      background: none;
      outline: none;

      &::placeholder {
        color: var(--color-primary);
      }

      &.placeholder-light::placeholder {
        color: var(--color-gray);
      }
    }
  }

  .button-label {
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .options-container {
    width: 100%;
    position: absolute;
    left: 0;
    top: 50px;
    border-radius: 0 20px 20px;
    padding: 20px 0;
    box-shadow: 0px 2px 30px -19px black;

    ul {
      width: 100%;
      max-height: 180px;
      overflow-y: scroll;
      list-style: none;
      margin: 0;
      padding: 0;
      user-select: none;

      &::-webkit-scrollbar {
        width: 2px;
        transition: width 0.3s ease;
      }
      &:hover::-webkit-scrollbar {
       width: 8px; 
      }
      &::-webkit-scrollbar-track {
        background: none;
      }

      li {
        display: flex;
        align-items: center;
        padding: 3px 10px;
        cursor: pointer;

        &:hover {
          background: rgba(0, 0, 0, 0.02);
        }
      }
    }

    .scrollbar-color-white {
      &::-webkit-scrollbar-thumb {
        background: var(--color-white);
        &:hover {
          background: var(--color-white);
        }
      }
    }

    .scrollbar-color-secondary {
      &::-webkit-scrollbar-thumb {
        background: var(--color-secondary);
        &:hover {
          background: var(--color-secondary);
        }
      }
    }
  }
}
</style>
