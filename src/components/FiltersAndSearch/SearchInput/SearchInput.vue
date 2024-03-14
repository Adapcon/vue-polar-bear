<template>
  <div
    class="pb-search-container"
    style="position: relative; margin: 5px; width: 100%;"
  >
    <div class="pb-search-input-container">
      <input
        v-model="valueInput"
        :placeholder="placeholder"
        :disabled="disabled"
        class="pb"
        :class="{
          'pb-search-input-suggestions' : suggestions.length,
          'pb-search-error' : hasError,
          'pb-search-white': darkBackground,
          'pb-search-input-disabled': disabled,
        }"
        :style="searchInputStyle"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
        @keyup.enter="() => $emit('search')"
      >
      <div
        v-if="showIcon"
        class="pb-search-input-icon-search"
        :class="{
          'pb-search-input-icon-search-white': darkBackground,
          'pb-search-input-disabled': disabled
        }"
        @click="!disabled ? $emit('search') : ''"
      >
        <PbIcon icon="fas fa-search" />
      </div>
      <div
        v-if="valueInput.length"
        class="pb-search-input-icon-clear"
        :class="{
          'pb-search-input-icon-clear-white': darkBackground,
          'pb-search-input-disabled': disabled
        }"
        @click="!disabled ? clearInput : ''"
      >
        <PbIcon icon="fas fa-times" />
      </div>
    </div>
    <div
      v-if="suggestions.length"
      class="pb-search-suggestions layer-overlay"
    >
      <div
        v-for="(suggestion, index) in suggestions"
        :key="`${suggestion.value}||${index}`"
        class="pb-search-suggestions-item"
        :class="{
          'pb-search-input-disabled': disabled
        }"
        @click="!disabled ? selectSuggestion(suggestion) : ''"
      >
        <PbIcon
          class="pb-search-suggestions-item-icon"
          :icon="suggestion.type === 'history' ? 'fas fa-clock' : 'fas fa-search'"
        />
        {{ suggestion.value }}
      </div>
    </div>
  </div>
</template>

<script>
import { validateColor } from '@pb/utils/validator';
import PbIcon from '@pb/Miscellaneous/Icon/Icon';

export default {
  name: 'PbSearchInput',
  components: {
    PbIcon,
  },
  props: {
    value: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    suggestions: { type: Array, default: () => [] },
    disabled: { type: Boolean, default: false },
    darkBackground: { type: Boolean, default: false },
    showIcon: { type: Boolean, default: true },
    hasError: { type: Boolean, default: false },
    background: { type: String, default: 'transparent' },
    borderColor: { type: String, default: 'gray-20', validator: validateColor },
  },
  computed: {
    valueInput: {
      get() {
        return this.value;
      },
      set(newInputValue) {
        this.$emit('input', newInputValue);
      },
    },

    searchInputStyle() {
      return {
        background: `var(--color-${this.background})`,
        color: this.darkBackground ? 'color: var(--color-white)' : '',
        border: `1px solid var(--color-${this.borderColor})`
      };
    },
  },
  methods: {
    selectSuggestion(suggestion) {
      this.valueInput = suggestion.value;

      this.$emit('selected-suggestion', suggestion);
    },
    clearInput() {
      this.valueInput = '';
      this.$emit('clear-input');
    },
  },
};
</script>

<style lang='scss' scoped>
.pb-search-input-container {
  width: 100%;
  position: relative;

  input {
    width: 100%;
    height: 40px;
    border-radius: 20px;
    padding: 0 32px 0 36px;
    background: none;
    outline: none;
    transition: all .3s ease;
    border: 1px solid var(--color-gray-20);

    &:focus {
      border: 1px solid var(--color-gray-90);
    }
  }

  .pb-search-input-icon-search,
  .pb-search-input-icon-clear {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-gray-40);
    cursor: pointer;
    transition: all .3s ease;
  }

  .pb-search-input-icon-search {
    left: 14px;
  }

  .pb-search-input-icon-clear {
    right: 14px;
    &:hover {
      color: var(--color-gray-90);
    }
  }

  .pb-search-input-icon-search-white {
    color: var(--color-white);
  }

  input:focus ~ .pb-search-input-icon-search {
    color: var(--color-gray-90);
  }

  input:focus ~ .pb-search-input-icon-search-white {
    color: var(--color-white) !important;
  }

}

.pb-search-input-disabled {
  opacity: 0.5;
  cursor: not-allowed !important;
}

.pb-search-input-icon-clear-white {
  color: var(--color-gray) !important;

  &:hover {
    color: var(--color-white) !important;
  }
}

.pb-search-white {
  border-color: var(--color-gray) !important;

  &:focus {
    border: 1px solid var(--color-white) !important;
  }
}

.pb-search-input-suggestions {
  border-bottom-left-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
}

.pb-search-error {
  border: 1.5px solid var(--color-danger) !important;
}

.pb-search-suggestions {
  width: 100%;
  max-height: 180px;
  position: absolute;
  top: 39px;
  left: 0;
  z-index: 9999;
  padding: 12px 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  font-size: 13px;
  background: #fff;
  border: 1px solid var(--color-gray-20);
  border-radius: 0 0 20px 20px;

  .pb-search-suggestions-item {
    cursor: pointer;
    padding: 6px 20px;
    color: var(--color-gray-20);
    transition: all .2s ease;

    .pb-search-suggestions-item-icon {
      margin-right: 5px;
    }

    &:hover {
      background-color: #f8f8f8;
      color: var(--color-primary);
    }
  }
}
</style>
