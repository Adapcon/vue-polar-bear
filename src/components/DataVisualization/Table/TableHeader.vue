<template>
  <div class="table-header-container pb-row">
    <div
      v-for="(column, index) in header"
      v-show="!hiddenColumnsIndex.includes(index)"
      :key="column.label"
      :class="columnClasses(column.size, index)"
      :style="columnStyle(index)"
    >
      <div class="table-column">
        <small
          class="pb"
          style="color: var(--color-gray-90)"
        >{{
          column.label
        }}</small>

        <PbSortIcon
          v-if="hasSort"
          :value="getSortType(index)"
          color="gray-90"
          class="sort-icon"
          @input="(type) => setSortState(type, index)"
        />
      </div>
    </div>

    <div
      v-if="hasActionColumn && !hiddenColumnsIndex.includes('action')"
      :class="columnClasses(actionsSize)"
      :style="{
        order: 1000,
      }"
    >
      <div class="table-column">
        <small
          class="pb"
          style="color: var(--color-gray-90)"
        >AÇÕES</small>
      </div>
    </div>
    <div
      v-if="showExpandIcon"
      :class="expandIconClass"
      :style="{
        order: 1001,
      }"
    >
      <div
        class="table-column"
        style="justify-content: flex-end;"
      >
        <PbIcon
          class="expand-icon"
          :icon="expandIcon"
          :style="`color: var(--color-${expandIconColor});`"
          @click="$emit('update:expand-all', !expandAll)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PbSortIcon from '@pb/Miscellaneous/SortIcon/SortIcon.vue';
import PbIcon from '@pb/Miscellaneous/Icon/Icon';

export default {
  name: 'TableHeader',

  components: {
    PbSortIcon,
    PbIcon,
  },

  props: {
    header: { type: Array, default: () => [] },
    ellipsisOnOverflow: { type: Boolean, default: true },
    hasActionColumn: { type: Boolean, default: true },
    hasSort: { type: Boolean, default: true },
    actionsSize: { type: Number, default: 1 },
    hiddenColumnsIndex: { type: Array, default: () => [] },
    columnClasses: { type: Function, required: true },
    expandAll: { type: Boolean, default: false },
    expandRowsColumnSize: { type: Number, default: 1 },
  },

  data() {
    return {
      state: {
        sorts: [],
      },
    };
  },

  computed: {
    expandIconClass() {
      return `pb-col-${this.expandRowsColumnSize}`;
    },

    expandIcon() {
      return this.expandAll ? 'fas fa-compress' : 'fas fa-expand';
    },

    expandIconColor() {
      return this.expandAll ? 'primary' : 'gray-90';
    },

    showExpandIcon() {
      return this.hiddenColumnsIndex.length;
    },
  },

  methods: {
    /**
     * Used to set the priority of the column
     */
    columnStyle(index) {
      const hiddenColumns = this.hiddenColumnsIndex.map(columnIndex => ({ ...this.header[columnIndex], index: columnIndex }))
        .filter(columnIndex => columnIndex !== undefined);

      const isAHiddenColumn = this.hiddenColumnsIndex.some(hiddenColumnIndex => hiddenColumnIndex === index);
      if (isAHiddenColumn) {
        return {
          order: this.header[index].priority,
        };
      }

      const hiddenColumnsWithMorePriority = hiddenColumns.filter(column => column.priority < this.header[index].priority);
      if (!hiddenColumnsWithMorePriority.length)
        return;

      const newHiddenColumns = [...this.hiddenColumnsIndex
        .filter(hiddenColumnIndex => hiddenColumnIndex !== hiddenColumnsWithMorePriority[0].index),
      index];

      this.$emit('update:hidden-columns-index', newHiddenColumns);
      return {
        order: this.header[index].priority,
      };
    },

    getSortType(columnIndex) {
      return this.state.sorts[columnIndex]
        ? this.state.sorts[columnIndex].type
        : '';
    },

    setSortState(type, columnIndex) {
      if (!this.state.sorts[columnIndex])
        this.$set(this.state.sorts, [columnIndex], {});

      this.$set(this.state.sorts[columnIndex], 'type', type);
      this.clearSortState(columnIndex);

      this.$emit('sort', { columnIndex, type });
    },

    clearSortState(selectedSort) {
      return Object.keys(this.state.sorts).forEach(columnIndex => {
        if (Number(columnIndex) !== Number(selectedSort))
          this.$set(this.state.sorts[columnIndex], 'type', '');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.table-header-container {
  background-color: var(--color-gray);

  .table-column {
    display: flex;
    padding: 8px;

    small {
      text-transform: uppercase;
    }

    .sort-icon {
      margin-left: 8px;
      font-size: 13px;
    }

    .expand-icon {
      cursor: pointer;
      transition: transform 0.2s;

      &:hover {
        transform: scale(1.2);
      }
      &:active {
        transform: scale(1);
      }
    }
  }
}
</style>
