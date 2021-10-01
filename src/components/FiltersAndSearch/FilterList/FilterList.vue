<template>
  <ul class="pb pb-filter-list-container">
    <li>
      <div class="header" :style="`color: ${getHeaderColor}`">
        <small class="pb title">
          <b>{{ title }}</b>
        </small>

        <div id="icons">
          <PbIcon
            v-if="allowSearch"
            icon="fas fa-search"
            class="icon"
            @click="openSearchOption"
          />

          <PbCollapseIcon
            :is-icon-up="!state.collapsed"
            :color="getHeaderColor"
            class="icon"
            @click.native="toggleCollapse"
          />
        </div>
      </div>

      <PbSearchInput
        v-if="state.search.visible"
        v-model="state.search.searchValue"
        v-focus
        style="color: var(--color-gray-20); margin-left: 0px;"
        @search="searchOption()"
      />

      <ul
        v-show="!state.collapsed"
        :class="`options pb-scroll-${color}`"
        :style="optionsSize"
      >
        <li
          v-for="(option, index) in optionsList"
          :key="`${index}||${option.title}`"
          class="pb"
          :style="{
            color: `var(--color-${isColorWhite ? 'white' : 'gray-80'})`,
            cursor: 'pointer',
          }"
          @click="selectOption(option)"
        >
          <p class="pb-sm">
            <b>{{ option.title }}</b>
          </p>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import PbCollapseIcon from '@pb/Miscellaneous/CollapseIcon/CollapseIcon.vue';
import PbSearchInput from '@pb/FiltersAndSearch/SearchInput/SearchInput.vue';
import PbIcon from '@pb/Miscellaneous/Icon/Icon';
import { validateColor } from '@pb/utils/validator';

export default {
  name: 'PbFilterList',

  components: {
    PbCollapseIcon,
    PbSearchInput,
    PbIcon,
  },

  props: {
    title: { type: String, default: '' },
    options: { type: Array, default: () => ([]) },
    displaySize: { type: Number, default: 5 },
    collapsed: { type: Boolean, default: false },
    allowSearch: { type: Boolean, default: true },
    color: {
      type: String,
      default: 'primary',
      validator: color => validateColor(color),
    },
  },

  data() {
    return {
      state: {
        collapsed: false,
        search: {
          visible: false,
          searchValue: '',
        },
      },
    };
  },

  computed: {
    optionsSize() {
      return {
        height: `${(28.25 * (this.options.length < this.displaySize ? this.options.length : this.displaySize))}px`,
        overflow: this.options.length <= this.displaySize ? 'hidden' : 'auto',
      };
    },

    optionsList() {
      if (!this.state.search.searchValue)
        return this.options;

      const filterExpression = this.state.search.searchValue.replace(/\s/g, '.*');

      return this.options.filter(option => option.title.match(new RegExp(filterExpression, 'gi')));
    },

    getHeaderColor() {
      if (this.isColorWhite)
        return !this.state.collapsed ? 'var(--color-primary)' : `var(--color-${this.color})`;

      return !this.state.collapsed ? `var(--color-${this.color})` : 'var(--color-gray-20)';
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
  },

  methods: {
    selectOption(option) {
      this.$emit('click', { option });
    },

    toggleCollapse() {
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
  },
};
</script>

<style lang="scss" scoped>
.pb-filter-list-container {
  padding: 0 0 10px;
  width: 100%;
  color: var(--color-primary) !important;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 25px;
    border-bottom: 2px solid;
    padding-top: 15px;
    padding-bottom: 15px;

    .title {
      text-transform: uppercase;
    }

    #icons {
      display: flex;
      justify-content: space-between;

      .icon {
        margin-left: 10px;
        width: 20px;
        height: 14px;
        cursor: pointer;
      }
    }
  }

  .options {
    display: flex;
    flex-direction: column;
    padding: 0;
    position: relative;
  }
}
</style>
