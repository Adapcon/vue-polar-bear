<template>
  <section class="data-table-container">
    <ListData
      :entities="entities"
      :entity-schema="entitySchema"
      :settings="settings"
    >
      <template #actions>
        <slot name="actions" />
      </template>
      <template #custom-row="params">
        <slot
          name="custom-row"
          :entity="params.entity"
        />
      </template>
    </ListData>
  </section>
</template>

<script>
import ListData from './ListData.vue';

export default {
  name: 'PbDataTable',

  components: {
    ListData,
  },

  props: {
    title: {
      type: String,
      default: '',
    },
    settings: {
      type: Object,
      default: () => ({}),
    },
    entitySchema: {
      type: Object,
      default: () => ({}),
    },
    entities: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
.data-table-container {}
</style>
