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
      :hidden-columns-index.sync="state.hiddenColumnsIndex"
      :column-classes="columnClasses"
      :expand-rows-column-size="state.expandRowsColumnSize"
      :expanded.sync="state.expanded"
      @sort="(activeSorting) => (state.activeSorting = activeSorting)"
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
      :hidden-columns-index="state.hiddenColumnsIndex"
      :column-classes="columnClasses"
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
        hiddenColumnsIndex: [],
        expanded: false,
        shouldSubtractLastColumnSize: null,
        expandRowsColumnSize: 1,
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

    headerColumns() {
      return Array.from(
        document.body.getElementsByClassName('table-header-container')[0]
          ?.childNodes || [],
      );
    },

    shownHeadersColumns() {
      return Array.from(this.headerColumns.filter(value => value.offsetTop !== undefined))
        .filter((_, idx) => !this.state.hiddenColumnsIndex.includes(idx));
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
    this.setHiddenColumns();
    window.addEventListener('resize', this.onWindowResize);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onWindowResize);
  },

  methods: {
    setWindowWidth({ target } = {}) {
      if (!target) return;

      this.windowWidth = target.innerWidth;
    },

    onWindowResize(e) {
      this.setWindowWidth(e);
      this.setHiddenColumns();
    },

    setHiddenColumns() {
      this.state.hiddenColumnsIndex = [];
      this.$nextTick(() => {
        const columnsOffset = this.headerColumns
          .map(node => node.offsetTop)
          .filter(value => value !== undefined);
        if (!columnsOffset.length) return;

        /**
         * Here, we are verifying if the column header was wrapped.
         * If yes, ew need to hide this column.
         */
        this.state.hiddenColumnsIndex = columnsOffset.reduce((acc, curr, index) => {
          if (index === 0) return acc;

          if (curr === columnsOffset[0]) return acc;

          if (this.hasActionColumn && index === this.header.length)
            acc.push('action');
          else acc.push(index);

          return acc;
        }, []);

        /**
         * If there is any hidden column, we need to verify if there is enough space to the expand icon appears.
         * If not, we need to subtract the last column size.
         * If yes, we need to verify what size the expand icon should be.
         */

        if (this.state.hiddenColumnsIndex) {
          // eslint-disable-next-line no-nested-ternary
          const sizeWord = this.windowWidth < 576 ? '' : this.windowWidth < 768 ? 'sm-' : this.windowWidth < 993 ? 'md-' : 'lg-';
          const sizeClass = `pb-col-${sizeWord}`;

          const headerColumnSize = this.shownHeadersColumns.reduce((acc, curr, index) => {
            /** expand div */
            if (index === this.shownHeadersColumns.length - 1) return acc;

            const classList = Array.from(curr.classList);
            const currentClass = classList.find(value => value.includes(sizeClass));
            return [...acc, Number(currentClass?.replace(/\D/g, ''))];
          }, []);

          const totalSize = headerColumnSize.reduce((acc, curr) => acc + curr, 0);
          const shouldSubtractLastColumnSize = totalSize >= 12;
          this.state.shouldSubtractLastColumnSize = shouldSubtractLastColumnSize;
          this.state.columnWithReducedSize = shouldSubtractLastColumnSize
            ? headerColumnSize.length - 1
            : null;
          this.state.expandRowsColumnSize = Math.max(12 - totalSize, 1);
        } else {
          this.state.columnWithReducedSize = null;
        }
      });
    },

    /**
     * This function is responsible for add the classes to the columns;
     */
    columnClasses(size, index) {
      /**
       * We are using the variable shouldSubtractLastColumnSize to verify if we need to subtract the last column size.
       */
      const shownHeaders = Array.from(Array.from(
        document.body.getElementsByClassName('table-header-container')[0]
          ?.childNodes || [],
      ).filter(value => value.offsetTop !== undefined))
        .filter((_, idx) => !this.state.hiddenColumnsIndex.includes(idx));

      const minus = index === shownHeaders.length - 1 && this.state.shouldSubtractLastColumnSize
        ? 1
        : 0;

      return [
        `pb-col-${this.getSmallColumnSize(size) - minus}`,
        `pb-col-sm-${this.getSmallColumnSize(size) - minus}`,
        `pb-col-md-${this.getMediumColumnSize(size) - minus}`,
        `pb-col-xl-${this.getColumnSize(size) - minus}`,
        `pb-col-lg-${this.getColumnSize(size) - minus}`,
      ];
    },

    getColumnSize(size) {
      return Math.min(size, 12);
    },

    getSmallColumnSize(size) {
      return Math.min(size * 2, 12);
    },

    getMediumColumnSize(size) {
      return Math.min(size + 2, 12);
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
