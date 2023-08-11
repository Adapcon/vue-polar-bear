<template>
  <div
    class="pb pb-filter-list-container"
    :class="{
      'pb-filter-list-disabled': disabled,
    }"
    :size="size"
    :variant="variant"
    :collapsed="state.collapsed"
  >
    <header
      class="header"
      :style="`color: ${getHeaderColor}`"
      @click="toggleCollapse"
    >
      <div class="header-container">
        <div>
          <p class="pb-strong title ellipsis">
            <b>{{ title }}</b>
          </p>
        </div>
        <div class="icons">
          <div class="counter">
            <small class="pb">
              {{ state.checkedValues.length }}
            </small>
          </div>
          <div class="collapse-container">
            <PbCollapseIcon
              :is-icon-up="!state.collapsed"
              :color="getHeaderColor"
              class="icon"
            />
          </div>
        </div>
      </div>
    </header>

    <div class="search">
      <PbSearchInput
        v-if="allowSearch && !state.collapsed && showSearch"
        v-model="state.search.searchValue"
        style="color: var(--color-gray-20)"
        @search="searchOption()"
      />
      <PbLoadingBar
        v-if="loading"
        color="primary"
      />
    </div>

    <ul
      v-show="!state.collapsed"
      :class="`options pb-scroll-${color}`"
      :style="optionsSize"
    >
      <li
        v-for="(option, index) in optionsList"
        :key="`${index}||${option.title}`"
        class="option"
        :style="
          state.checkedValues.includes(option.title)
            ? `color: ${getHeaderColor}`
            : 'color: var(--color-gray-80)'
        "
        @click="handleOptionClick(option.title)"
      >
        <p class="pb">
          {{ option.title }}
        </p>
      </li>
    </ul>
    <div>
      <PbChips
        v-if="!state.collapsed"
        v-show="multiSelector"
        :chips.sync="chips"
        color="primary"
        @update:chips="updateChips"
      />
    </div>
  </div>
</template>

<script>
import PbCollapseIcon from '@pb/Miscellaneous/CollapseIcon/CollapseIcon.vue';
import PbSearchInput from '@pb/FiltersAndSearch/SearchInput/SearchInput.vue';
import PbLoadingBar from '@pb/Loadings/LoadingBar/LoadingBar.vue';
import { validateColor } from '@pb/utils/validator';
import PbChips from '../../DataVisualization/Chips/Chips.vue';

export default {
  name: 'PbFilterList',

  components: {
    PbCollapseIcon,
    PbSearchInput,
    PbChips,
    PbLoadingBar,
  },

  props: {
    title: { type: String, default: '' },
    options: { type: Array, default: () => [] },
    initialCheckedValues: { type: Array, default: () => [] },
    displaySize: { type: Number, default: 5 },
    disabled: { type: Boolean, default: false },
    collapsed: { type: Boolean, default: false },
    multiSelector: { type: Boolean, default: false },
    allowSearch: { type: Boolean, default: true },
    loading: { type: Boolean, default: false },
    color: {
      type: String,
      default: 'primary',
      validator: color => validateColor(color),
    },
    variant: {
      type: String,
      default: 'outline',
      validator: variant => ['outline', 'background-light', 'no-background'].includes(variant),
    },
    size: {
      type: String,
      default: 'md',
      validator: size => ['sm', 'md', 'lg'].includes(size),
    },
  },

  data() {
    return {
      state: {
        label: false,
        collapsed: false,
        search: {
          visible: false,
          searchValue: '',
        },
        checkedValues: [],
      },
    };
  },

  computed: {
    chips: {
      get() {
        const chips = this.checkedValues.map(title => ({ title }));

        return chips;
      },

      set(chips) {
        this.checkedValues = chips.map(chip => chip.title);
      },
    },

    checkedValues: {
      get() {
        return this.state.checkedValues;
      },

      set(value) {
        this.$set(this.state, 'checkedValues', value);
        this.$emit('update:checkedValues', this.getValueList());
      },
    },

    optionsSize() {
      return {
        height: `${
          35
          * (this.options.length < this.displaySize
            ? this.options.length
            : this.displaySize)
        }px`,
        overflow: this.options.length <= this.displaySize ? 'hidden' : 'auto',
      };
    },

    showSearch() {
      return this.optionsList.length >= 10;
    },

    optionsList() {
      if (!this.state.search.searchValue) return this.options;

      const filterExpression = this.state.search.searchValue.replace(
        /\s/g,
        '.*',
      );

      return this.options.filter(option => option.title.match(new RegExp(filterExpression, 'gi')));
    },

    getSearchIconColor() {
      return this.state.search.visible
        ? 'var(--color-primary)'
        : 'var(--color-gray-20)';
    },

    getHeaderColor() {
      if (this.isColorWhite) {
        return !this.state.collapsed
          ? 'var(--color-primary)'
          : `var(--color-${this.color})`;
      }

      return !this.state.collapsed
        ? `var(--color-${this.color})`
        : 'var(--color-gray-20)';
    },

    isColorWhite() {
      return this.color === 'white';
    },
  },

  watch: {
    collapsed(newValue) {
      this.collapseOptions(newValue);
    },
  },

  created() {
    this.collapseOptions(this.collapsed);
    this.state.checkedValues = this.initialCheckedValues;
  },

  methods: {
    updateChips(value) {
      this.state.checkedValues = value.map(chip => chip.title);
    },

    handleOptionClick(title) {
      if (this.multiSelector)
        return this.multipleSelector(title);

      this.selector(title);
    },

    multipleSelector(value) {
      if (this.checkedValues.includes(value)) {
        const index = this.checkedValues.indexOf(value);

        return this.checkedValues.splice(index, 1);
      }
      this.checkedValues = [...this.checkedValues, value];
    },

    selector(value) {
      this.checkedValues = !this.checkedValues.includes(value) ? [value] : [];
    },

    toggleCollapse() {
      if (this.disabled) return;

      this.collapseOptions(!this.state.collapsed);
      this.$emit('collapsed', this.state.collapsed);
    },

    collapseOptions(status) {
      this.state.collapsed = status;

      if (this.state.collapsed === true) {
        this.state.search.visible = false;
        this.state.search.searchValue = '';
      }
    },

    openSearchOption() {
      this.state.search.visible = !this.state.search.visible;
      this.collapseOptions(false);

      if (this.state.search.visible === false)
        this.state.search.searchValue = '';
    },

    getValueList() {
      return this.checkedValues.map(values => {
        const option = this.options.find(opt => opt.title === values);
        return option?.value || option?.title;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.pb-filter-list-container {
  width: 100%;
  border-radius: 8px;

  .header {
    border-radius: 8px;

    :hover {
      background-color: var(--color-gray-5);
      border-radius: 8px;
    }

    .header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;

      .ellipsis {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      .title {
        text-transform: uppercase;
        color: var(--color-gray-90);
      }

      .icons {
        display: flex;
        justify-content: flex-end;

        .counter {
          width: 26px;
          height: 20px;
          margin-right: 20px;
          border-radius: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: var(--color-gray-40);

          small {
            color: var(--color-white);
          }
        }

        .icon-container {
          display: flex;
          justify-content: center;
          align-items: center;

          .icon {
            width: 16px;
            height: 10px;
            cursor: pointer;
          }
        }
      }
    }
  }

  .search {
    margin: -5px; // NOTE (gabrielforster): Remove security margin from PbSearchInput

    &::v-deep .pb-search-container {
      width: 100%;

      .pb-search-input-container {
        input {
          width: unset;
        }
      }
    }
  }

  .options {
    display: flex;
    flex-direction: column;
    position: relative;
    list-style: none;
    cursor: pointer;
    margin-left: -40px;

    .option {
      height: auto;
      display: flex;
      align-items: center;

      &:hover {
        background-color: var(--color-gray-5);
      }

      p {
        margin: 0;
      }
    }
  }

  &[variant="outline"] {
    border: 1px solid var(--color-gray-20);
  }

  &[variant="no-background"] {
    background-color: transparent;
  }

  &[variant="background-light"] {
    border: 1px solid var(--color-gray-20);
    background-color: var(--color-gray);
  }

  &[size="sm"] {
    min-height: 38px;

    .header {
      .header-container {
        padding: 8px;
      }
    }

    .search {
      padding-inline: 8px;
    }

    .options {
      .option {
        padding: 8px;
      }
    }
  }

  &[size="md"] {
    min-height: 46px;

    .header {
      .header-container {
        padding: 12px;
      }
    }

    .search {
      padding-inline: 12px;
    }

    .options {
      .option {
        padding: 12px;
      }
    }
  }

  &[size="lg"] {
    min-height: 54px;

    .header {
      .header-container {
        padding: 16px;
      }
    }

    .search {
      padding-inline: 16px;
    }

    .options {
      .option {
        padding: 16px;
      }
    }
  }
}

.pb-filter-list-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
