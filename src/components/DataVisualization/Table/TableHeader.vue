<template>
  <div class="table-header-container pb-row">
    <div
      v-for="(column, index) in header"
      v-show="!hiddenColumns.includes(index)"
      :key="column.label"
      :class="columnClasses(column.size)"
    >
      <div class="table-column">
        <small
          class="pb"
          style="color: var(--color-gray-90);"
        >{{ column.label }}</small>

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
      v-if="hasActionColumn && !hiddenColumns.includes('action')"
      :class="columnClasses(actionsSize)"
    >
      <div class="table-column">
        <small
          class="pb"
          style="color: var(--color-gray-90);"
        >AÇÕES</small>
      </div>
    </div>
    <div
      v-if="showExpandIcon"
      class="pb-col-1"
    >
      <div class="table-column">
        <PbIcon
          :icon="expandIcon"
          :style="`color: var(--color-${expandIconColor}); cursor: pointer;`"
          @click="$emit('update:expanded', !expanded)"
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
    hiddenColumns: { type: Array, default: () => [] },
    columnClasses: { type: Function, required: true },
    expanded: { type: Boolean, default: false },
  },

  data() {
    return {
      state: {
        sorts: [],
      },
    };
  },

  computed: {
    expandIcon() {
      return this.expanded ? 'fas fa-compress' : 'fas fa-expand';
    },

    expandIconColor() {
      return this.expanded ? 'primary' : 'gray-90';
    },

    showExpandIcon() {
      return this.hiddenColumns.length;
    },
  },
  methods: {
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
  }
}
</style>
