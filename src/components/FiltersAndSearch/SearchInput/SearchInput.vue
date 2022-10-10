<template>
  <div>
    <div class="pb-search-input-container">
      <div
        v-if="showIcon"
        class="pb-search-input-icon-search icons"
        :class="{
          'pb-search-input-icon-search-white': darkBackground,
        }"
        @click="$emit('search')"
      >
        <PbIcon icon="fas fa-search" />
      </div>
      <input
        v-model="valueInput"
        :placeholder="placeholder"
        class="pb"
        :class="{
          'pb-search-input-suggestions' : suggestions.length,
          'pb-search-error' : hasError,
          'pb-search-white': darkBackground,
        }"
        :style="darkBackground ? 'color: var(--color-white)' : ''"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
        @keyup.enter="() => $emit('search')"
      >
      <div
        v-if="valueInput.length"
        class="pb-search-input-icon-clear icons"
        :class="{
          'pb-search-input-icon-clear-white': darkBackground,
        }"
        @click="clearInput"
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
        @click="selectSuggestion(suggestion)"
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
    darkBackground: { type: Boolean, default: false },
    showIcon: { type: Boolean, default: true },
    hasError: { type: Boolean, default: false },
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
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 40px;
  border-radius: 20px;
  background: none;
  outline: none;
  transition: all .3s ease;
  border: 1px solid var(--color-gray-20);
  
  &:focus {
    border: 1px solid var(--color-gray-90);
  }
  
  input {
    width: 96%;

    @media (max-width: 1600px) {
      width: 94%;
    }

    @media (max-width: 720px) {
      width: 80%;
    }
  }

  .pb-search-input-icon-search,
  .pb-search-input-icon-clear {
    color: var(--color-gray-40);
    cursor: pointer;
    transition: all .3s ease;
  }

  .icons {
    padding-top: 11px
  }

  .pb-search-input-icon-clear {
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
