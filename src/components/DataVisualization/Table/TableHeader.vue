<template>
  <div class="table-header-container pb-row">
    <div
      v-for="(column, index) in header"
      :key="column.label"
      :class="`pb-col-${column.size} table-column`"
    >
      <small class="pb">{{ column.label }}</small>

      <PbSortIcon
        v-if="hasSort"
        :value="getSortType(index)"
        color="gray-90"
        class="sort-icon"
        @input="type => setSortState(type, index)"
      />
    </div>

    <div
      v-if="hasActionColumn"
      :class="`pb-col-${actionsSize} table-column`"
    >
      <small class="pb">AÇÕES</small>
    </div>
  </div>
</template>

<script>
import PbSortIcon from '../../Miscellaneous/SortIcon/SortIcon.vue';
import PbHint from '../../Miscellaneous/Hint/Hint.vue';

export default {
  name: 'TableHeader',

  components: {
    PbSortIcon,
    PbHint,
  },

  props: {
    header: { type: Array, default: () => [] },
    ellipsisOnOverflow: { type: Boolean, default: true },
    hasActionColumn: { type: Boolean, default: true },
    hasSort: { type: Boolean, default: true },
    actionsSize: { type: String, default: '1' },
  },

  data() {
    return {
      state: {
        sorts: [],
      },
    };
  },

  methods: {
    getSortType(columnIndex) {
      return this.state.sorts[columnIndex] ? this.state.sorts[columnIndex].type : '';
    },

    setSortState(type, columnIndex) {
      if (!this.state.sorts[columnIndex]) this.$set(this.state.sorts, [columnIndex], {});

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
