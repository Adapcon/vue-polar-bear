<template>
  <section class="list-data-container">
    <slot name="HeaderList">
      <HeaderList
        :table-schema="state.tableSchema"
        :show-header="showHeader"
        :show-sort-icon="showSortIcon"
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
      class="pb-row"
    >
      <slot
        name="custom-row"
        :entity="entity"
      >
        <div
          v-for="(item, index) in state.tableSchema"
          :key="index"
          class="pb-col-2 "
        >
          <small
            class="pb content"
            :style="index === 0 ? 'padding: 8px 8px 13px 8px' : 'padding: 8px 8px 13px 0'"
          >
            {{ getEntityValuePath(entity, item.path) }}
          </small>
        </div>
        <slot name="actions" />
        <hr class="line">
      </slot>
    </div>
  </section>
</template>

<script>
import HeaderList from './HeaderList.vue';

export default {
  name: 'ListData',

  components: {
    HeaderList,
  },

  props: {
    showHeader: { type: Boolean, default: false },
    showSortIcon: { type: Boolean, default: false },
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
    getEntityValuePath(entity, path) {
      const keys = path.split('.');
      let value = entity;
      keys.forEach(key => {
        if (value[key]) value = value[key]; else value = '';
      });
      
      return value;
    },
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
