<template>
  <section class="list-data-container">
    <slot name="HeaderList">
      <HeaderList
        :table-schema="state.tableSchema"
        :settings="settings"
      />
    </slot>
    <div
      v-if="entities == ''"
      class="no-content"
    >
      <p class="pb"> Sem registros.</p>
    </div>
    <div
      v-for="(entity, indexEntity) in entities"
      :key="indexEntity"
    >
      <slots
        name="custom-row"
        :entity="entity"
      >
        <ListRow
          :table-schema="state.tableSchema"
          :entity="entity"
        >
          <template #actions>
            <slot name="actions" />
          </template>
        </ListRow>
      </slots>
    </div>
  </section>
</template>

<script>
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
    getTableSchema(entitySchema, historicPath = '', array = []) {
      // eslint-disable-next-line no-restricted-syntax
      for (const key in entitySchema) {
        const newHistoricPath = historicPath ? `${historicPath}.${key}` : key;
        if (Object.hasOwnProperty.call(entitySchema, key)) {
          const element = entitySchema[key];
            
          if (element.type !== 'object') {
            array.push({
              label: element.label,
              path: newHistoricPath,
            });
          } else {
            array.push(...this.getTableSchema(element.contentObject, newHistoricPath));
          }
        }
      }
      
      return array;
    },
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
