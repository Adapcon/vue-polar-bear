<template>
  <section class="list-data-container">
    <slot name="HeaderList">
      <HeaderList
        :table-schema="state.tableSchema"
        :settings="settings"
      />
    </slot>
    <div
      v-if="entities.length === 0"
      class="no-content"
    >
      <p class="pb"> {{ settings.emptyText }}</p>
    </div>
    <div
      v-for="(entity, indexEntity) in entities"
      :key="indexEntity"
    >
      <slot
        name="custom-row"
        :entity="entity"
      >
        <ListRow
          :table-schema="state.tableSchema"
          :entity="entity"
          :index-entity="indexEntity"
          @delete-this="$emit('delete-entity', indexEntity, entity)"
        >
          <template #actions>
            <slot name="actions" />
          </template>
        </ListRow>
      </slot>
    </div>
  </section>
</template>

<script>
import { EntitySchemaUtils } from '../../utils/entitySchema';
import HeaderList from './HeaderList.vue';
import ListRow from './ListRow.vue';

export default {
  name: 'ListData',

  components: {
    HeaderList,
    ListRow,
  },

  props: {
    settings: { type: Object, default: () => ({}) },
    entities: { type: Array, default: () => [] },
    entitySchema: { type: Object, default: () => ({}) },
  },

  data() {
    return {
      state: {
        tableSchema: [],
      },
    };
  },

  beforeMount() {
    this.state.tableSchema = this.getTableSchema(this.entitySchema);
  },

  methods: {
    getTableSchema: EntitySchemaUtils.getTableSchema,
  },
};
</script>

<style lang="scss" scoped>
.list-data-container {
  .no-content {
    text-align: center;
    padding: 8px;
    border-bottom: solid 1px var(--color-gray-5) ;
  }
  .content {
    width: 120px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
