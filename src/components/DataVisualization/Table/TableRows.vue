<template>
  <div
    class="table-rows pb-scroll-primary"
    :style="`${maxHeight ? `max-height: ${maxHeight}` : ''}`"
  >
    <div
      v-if="rows.length < 1"
      class="empty-title"
    >
      <p
        class="pb"
        style="color: var(--color-gray-20)"
      >
        Sem registros
      </p>
    </div>
    <div
      v-for="(row, index) in pageArray[currentPage]"
      :key="index"
      :class="{
        'row-highlight': highlightOnHover,
        'row-expanded': expandedRows.includes(index),
      }"
    >
      <div
        class="table-row pb-row"
        style="align-items: center;"
      >
        <div
          v-for="(column, columnIndex) in row"
          v-show="!hiddenColumnsIndex.includes(columnIndex)"
          :key="columnIndex"
          :class="columnClasses(header[columnIndex].size, columnIndex)"
        >
          <div class="table-column">
            <img
              v-if="isImage(column.value)"
              :src="column.value"
              class="image"
            >

            <div v-else>
              <PbHint
                :hint-text="column.value"
                :disabled="!ellipsisOnOverflow"
                :show-on-overflow-only="true"
                position="bottom-right"
              >
                <p :class="ellipsisClass">
                  {{ column.value }}
                </p>
              </PbHint>

              <p class="pb-sm secondary-value">{{ column.secondaryValue }}</p>
            </div>

            <div
              v-if="column.badges"
              class="badges"
            >
              <PbBadge
                v-for="badge of column.badges"
                :key="badge"
                :title="badge.value"
                :wrap-content="true"
                :background-color="badge.backgroundColor"
                :color="badge.fontColor"
                style="margin-right: 2px;"
                :size="badge.size"
              />
            </div>
          </div>
        </div>

        <div
          v-if="hasActionColumn && !hiddenColumnsIndex.includes('action')"
          :class="columnClasses(actionsSize)"
          :style="{
            order: 1000,
          }"
        >
          <div class="column">
            <slot
              name="actions"
              :row="row"
              :metadata="metadata[index]"
            />
          </div>
        </div>
        <div
          v-if="showExpandIcon"
          :class="expandIconClass"
          :style="{
            order: 1001,
          }"
        >
          <div class="table-column align-left">
            <PbIcon
              class="expand-icon"
              :icon="expandIcon(index)"
              :style="`color: var(--color-primary);`"
              @click="updateExpandedRows(index)"
            />
          </div>
        </div>
      </div>
      <div v-if="expandedRows.includes(index)">
        <div class="table-row pb-row">
          <div
            v-for="(column, columnIndex) in row"
            v-show="hiddenColumnsIndex.includes(columnIndex)"
            :key="columnIndex"
            class="pb-col-12"
          >
            <div class="table-column">
              <small class="pb">{{ header[columnIndex].label }}</small>
              <img
                v-if="isImage(column.value)"
                :src="column.value"
                class="image"
              >

              <div v-else>
                <PbHint
                  :hint-text="column.value"
                  :disabled="!ellipsisOnOverflow"
                  :show-on-overflow-only="true"
                  position="bottom-right"
                >
                  <p :class="ellipsisClass">
                    {{ column.value }}
                  </p>
                </PbHint>

                <p class="pb-sm secondary-value">{{ column.secondaryValue }}</p>
              </div>

              <div>
                <PbBadge
                  v-for="badge of column.badges"
                  :key="badge"
                  :title="badge"
                  :wrap-content="true"
                  style="margin-right: 2px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="page-indicators">
      <PbButton
        :disabled="disableReturnOnFirstPage"
        icon="fas fa-chevron-up"
        style="transform: rotate(-90deg)"
        @click.native="changePage('return')"
      />
      <div class="page-indexes">
        <div :class="currentPage === 0 ? 'current-page-indicator' : ''">
          <p
            class="pb"
            @click="goToFirstPage()"
          >
            {{ 1 }}
          </p>
        </div>

        <p
          v-if="currentPage > 4"
          class="pb"
        >
          ...
        </p>
        <div class="visualize-pages-index">
          <div
            v-for="index of pageArray.length - 1"
            :key="index"
            :class="currentIndex(index)"
          >
            <p class="pb">{{ index + 1 }}</p>
          </div>
        </div>
      </div>
      <PbButton
        :disabled="disableNextOnLastPage"
        icon="fas fa-chevron-up"
        style="transform: rotate(90deg)"
        @click.native="changePage('next')"
      />
    </div>
  </div>
</template>

<script>
import { isImage } from 'adapcon-utils-js';
import PbHint from '../../Miscellaneous/Hint/Hint.vue';
import PbBadge from '../../Miscellaneous/Badge/Badge.vue';
import PbIcon from '../../Miscellaneous/Icon/Icon';
import PbButton from '../../Buttons/Button/Button.vue';

export default {
  name: 'TableRows',

  components: {
    PbHint,
    PbBadge,
    PbIcon,
    PbButton,
  },

  props: {
    header: { type: Array, default: () => [] },
    rows: { type: Array, default: () => [] },
    metadata: { type: Array, default: () => [] },
    ellipsisOnOverflow: { type: Boolean, default: true },
    highlightOnHover: { type: Boolean, default: true },
    hasActionColumn: { type: Boolean, default: true },
    maxHeight: { type: String, default: '' },
    actionsSize: { type: Number, default: 1 },
    expandedRows: { type: Array, default: () => [] },
    hiddenColumnsIndex: { type: Array, default: () => [] },
    columnClasses: { type: Function, required: true },
    expandRowsColumnSize: { type: Number, default: 1 },
    expandAll: { type: Boolean, default: false },
    count: { type: Number, default: 16 },
    pageLimit: { type: Number, default: 5 },
  },

  data() {
    return {
      pageArray: [],
      currentPage: 0,
    };
  },

  computed: {
    disableReturnOnFirstPage() {
      return this.currentPage === 0;
    },
    disableNextOnLastPage() {
      return this.currentPage === Math.ceil(this.count / this.pageLimit) - 1;
    },
    expandIconClass() {
      return `pb-col-${this.expandRowsColumnSize}`;
    },

    internalExpandedRows: {
      get() {
        return this.expandedRows;
      },

      set(newValue) {
        this.$emit('update:expandedRows', newValue);
      },
    },

    showExpandIcon() {
      return this.hiddenColumnsIndex.length;
    },

    ellipsisClass() {
      return this.ellipsisOnOverflow ? 'pb-md ellipsis-on-overflow' : 'pb-md';
    },
  },

  watch: {
    expandAll: {
      handler(newValue) {
        this.internalExpandedRows = newValue
          ? this.rows.map((_, index) => index)
          : [];
      },
    },
  },

  created() {
    for (let i = 0; i < this.rows.length; i += this.pageLimit) this.pageArray.push(this.rows.slice(i, i + this.pageLimit));
  },

  methods: {
    isImage,

    setOffset() {
      this.$emit('offset', this.currentPage * this.pageLimit);
      console.log(this.currentPage * this.pageLimit, 'this.currentPage * this.pageLimit');
    },

    currentIndex(index) {
      return this.currentPage === index ? 'current-page-indicator' : '';
    },

    changePage(setPagination) {
      if (setPagination === 'next') this.$emit('currentPage', this.currentPage++);

      if (setPagination === 'return') this.$emit('currentPage', this.currentPage--);

      this.setOffset();
    },

    goToFirstPage() {
      this.currentPage = 0;
    },

    expandIcon(index) {
      return this.expandedRows.includes(index)
        ? 'fas fa-chevron-up'
        : 'fas fa-chevron-up fa-rotate-180';
    },

    updateExpandedRows(index) {
      const expandRow = !this.expandedRows.includes(index);

      this.internalExpandedRows = expandRow
        ? [...this.expandedRows, index]
        : this.expandedRows.filter(i => i !== index);
    },
  },
};
</script>

<style lang="scss" scoped>
.current-page-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: rgba(var(--color-primary-rgb), 0.16);
}
.table-rows {
  overflow: auto;

  .page-indicators {
    width: auto;
    display: flex;
    align-items: center;

    .page-indexes {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-gray-20);

      .visualize-pages-index {
        display: flex;
        max-width: 97px;
        overflow: hidden;
        justify-content: flex-end;
        align-items: center;
      }

      p {
        padding: 0 12px;
        cursor: pointer;
      }
    }
  }

  .empty-title {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    p {
      padding: 16px;
    }
  }

  .row-highlight > :hover {
    background-color: var(--color-gray);
    transition: 0.5s;
  }

  .row-expanded {
    background-color: var(--color-gray);
  }

  .table-row {
    display: flex;

    .table-column {
      padding: 8px;

      .badges {
        text-transform: uppercase;
      }

      small {
        color: var(--color-gray-90);
        margin-bottom: 8px !important;
      }
      .ellipsis-on-overflow {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .image {
        height: 24px;
        width: 24px;
      }

      .secondary-value {
        color: var(--color-gray-40);
        margin-top: 8px !important;
      }

      .expand-icon {
        cursor: pointer;
        transition: transform 0.2s;

        &:active {
          transform: scale(1);
        }
      }
    }

    .align-left {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
}
</style>
