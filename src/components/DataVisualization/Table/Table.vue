<template>
  <div class="table-container">
    <div
      v-if="hasActionsBar"
      :class="{ 'actions-bar': !isMobile, 'actions-bar-mobile': isMobile }"
    >
      <div class="search-input">
        <PbSearchInput
          v-model="state.searchTerm"
          placeholder="O que você procura?"
          @search="$emit('search', state.searchTerm)"
          @clear-input="$emit('clear-input')"
        />
      </div>
      
      <slot name="extra-actions" />
    </div>

    <TableHeader
      :header="header"
      :ellipsis-on-overflow="ellipsisOnOverflow"
      :has-action-column="hasActionColumn"
      :has-sort="hasSort"
      :actions-size="actionsSize"
      @sort="activeSorting => state.activeSorting = activeSorting"
    />

    <PbLoadingBar v-if="loading" />

    <TableRows
      :header="header"
      :rows="sortedRows"
      :metadata="metadata"
      :ellipsis-on-overflow="ellipsisOnOverflow"
      :highlight-on-hover="highlightOnHover"
      :has-action-column="hasActionColumn"
      :max-height="calculatedMaxHeight"
      :actions-size="actionsSize"
    >
      <template #actions="props">
        <slot
          name="actions"
          :row="props.row"
          :metadata="props.metadata"
        />
      </template>
    </TableRows>
  </div>
</template>

<script>
import TableHeader from './TableHeader.vue';
import TableRows from './TableRows.vue';
import PbSearchInput from '../../FiltersAndSearch/SearchInput/SearchInput.vue';
import PbLoadingBar from '../../Loadings/LoadingBar/LoadingBar.vue';

export default {
  name: 'PbTable',

  components: {
    TableHeader,
    TableRows,
    PbSearchInput,
    PbLoadingBar,
  },

  props: {
    header: { type: Array, default: () => [] },
    rows: { type: Array, default: () => [] },
    metadata: { type: Array, default: () => [] },
    loading: { type: Boolean, default: false },
    ellipsisOnOverflow: { type: Boolean, default: true },
    highlightOnHover: { type: Boolean, default: true },
    hasActionColumn: { type: Boolean, default: true },
    hasSort: { type: Boolean, default: true },
    hasActionsBar: { type: Boolean, default: true },
    maxHeight: { type: String, default: '' },
    actionsSize: { type: Number, default: 1 },
  },

  data() {
    return {
      windowWidth: window.innerWidth,
      state: {
        isMobile: window.innerWidth <= 375,
        activeSorting: {},
        searchTerm: '',
      },
    };
  },

  computed: {
    isMobile() {
      return this.windowWidth <= 375;
    },

    sortedRows() {
      const rows = [...this.rows];

      if (!Object.keys(this.state.activeSorting).length) return rows;

      const { columnIndex, type } = this.state.activeSorting;

      return rows.sort((current, next) => this.sort(current[columnIndex], next[columnIndex], type));
    },
    
    calculatedMaxHeight() {
      if (!this.maxHeight) return;
      if (!this.hasActionsBar) return this.maxHeight;

      const actionsBarHeight = 50;
      const actionsBarMarginBottom = this.isMobile ? 24 : 40;

      return `calc(${this.maxHeight} - ${actionsBarHeight}px - ${actionsBarMarginBottom}px)`;
    },
  },

  mounted() {
    window.addEventListener('resize', this.setWindowWidth);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.setWindowWidth);
  },

  methods: {
    setWindowWidth({ target } = {}) {
      if (!target) return;

      this.windowWidth = target.innerWidth;
    },

    sort(current, next, type) {
      const currentValue = current.value || '';
      const nextValue = next.value || '';

      if (type === 'desc') return currentValue < nextValue ? 1 : -1;
      if (type === 'asc') return currentValue > nextValue ? 1 : -1;

      return 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.table-container {
  .actions-bar {
    display: flex;
    align-items: center;
    margin-bottom: 40px;

    .search-input {
      margin-right: 24px;
      width: 100%;
    }
  }

  .actions-bar-mobile {
    display: flex;
    align-items: center;
    margin-bottom: 24px;

    .search-input {
      margin-right: 16px;
      width: 100%;
    }
  }
}
</style>
