<template>
  <div
    class="table-rows pb-scroll-primary"
    :style="`${maxHeight ? `max-height: ${maxHeight}` : ''}`"
  >
    <div
      v-for="(row, index) in rows"
      :key="index"
      :class="{ 'row-highlight': highlightOnHover }"
    >
      <div class="table-row pb-row">
        <div
          v-for="(column, columnIndex) in row"
          :key="columnIndex"
          :class="`pb-col-${header[columnIndex].size} table-column`"
        >
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
              <p :class="`${ellipsisOnOverflow ? 'pb-md ellipsis-on-overflow' : 'pb-md'}`">{{ column.value }}</p>
            </PbHint>

            <p class="pb-sm secondary-value">{{ column.secondaryValue }}</p>
          </div>

          <div>
            <PbBadge
              v-for="badge of column.badges"
              :key="badge"
              :title="badge"
              :wrap-content="true"
              style="margin-right: 2px;"
            />
          </div>
        </div>

        <div
          v-if="hasActionColumn"
          :class="`pb-col-${actionsSize} column`"
        >
          <slot
            name="actions"
            :row="row"
            :metadata="metadata[index]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PbHint from '../../Miscellaneous/Hint/Hint.vue';
import PbBadge from '../../Miscellaneous/Badge/Badge.vue';
import { isImage } from 'adapcon-utils-js';

export default {
  name: 'TableRows',

  components: {
    PbHint,
    PbBadge,
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
  },

  methods: {
    isImage,
  },
};
</script>

<style lang="scss" scoped>
.table-rows {
  overflow: auto;

  .row-highlight > :hover {
    background-color: var(--color-gray);
    transition: 0.5s;
  }

  .table-row {
    display: flex;

    .table-column {
      padding: 8px;
      min-width: 120px;

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
    }
  }

}
</style>
