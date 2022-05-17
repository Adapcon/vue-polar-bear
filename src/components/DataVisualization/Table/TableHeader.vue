<template>
  <div
    class="table-header-container pb-row"
  >
    <div
      v-for="(column, index) in header"
      :key="column.label"
      :class="`pb-col-${column.size} table-column flex flex-1 flex-wrap-reverse cc-min-width-120`"
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
    actionsSize: { type: Number, default: 1 },
  },

  data() {
    return {
      state: {
        sorts: [],
      },
    };
  },

  mounted() {
    window.addEventListener('resize', this.getWidthSizeCell);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.getWidthSizeCell);
  },

  methods: {
    getWidthSizeCell() {
      // const e = document.getElementById('ateste');

      // // const d = document.getElementById('teste');
      // // const topPos = d.offsetTop;
      // const ePos = e.offsetHeight;

      // if (ePos) return console.log(ePos);

      // eslint-disable-next-line no-undef
      const wrappers = document.getElementsByClassName('flex');

      if (wrappers.length) { // don't add listener if no flex elements
        window.addEventListener('resize', () => {
          wrappers.forEach(() => {
            const prnt = wrappers;
            const chldrn = prnt.children(':not(:first-child)'); // select flex items
            const frst = prnt.children().first();

            chldrn.forEach((i, e) => { wrappers(e).toggleClass('flex-wrapped', wrappers(e).offsetTop !== frst.offsetTop); }); // element has wrapped
            prnt.toggleClass('flex-wrapping', !!frst.find('.flex-wrapped').length); // wrapping has started
            frst.toggleClass('flex-wrapped', !chldrn.filter(':not(.flex-wrapped)').length); // all are wrapped
          });
        });
      }
    },

    getSortType(columnIndex) {
      return this.state.sorts[columnIndex] ? this.state.sorts[columnIndex].type : '';
    },

    // getTop() {
    //   const d = document.getElementById('teste');

    //   const topPos = d.offsetTop;

    //   if (topPos) console.log(topPos);
    // },

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
    // display: flex;
    min-width: 120px;
    padding: 8px;

     .flex {
    display: flex;

    .flex-wrap {
      flex-wrap: wrap;
    }

    .flex-1 {
      flex: 1;
    }
  }

  .flex > * {
    flex-grow: 1;
  }

  .cc-min-width-120 > * {
    min-width: 120px;
  }

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
