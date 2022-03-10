<template>
  <section class="data-table-container">
    <PbButton
      v-if="settings.showCreateButton"
      button-style="background"
      icon="fas fa-plus"
      @click.native="openToNewEntity"
    />
    <ListData
      :entities="entities"
      :entity-schema="entitySchema"
      :settings="settings"
      @delete-entity="(indexEntity, entity) => $emit('delete-entity', indexEntity, entity)"
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
    <EntityController
      :title="title"
      :entity-schema="entitySchema"
      @update-entity="(indexEntity, entity) => $emit('update-entity', indexEntity, entity)"
      @create-entity="(entity) => $emit('create-entity', entity)"
    />
  </section>
</template>

<script>
import ListData from './ListData.vue';
import EntityController from './EntityController.vue';
import { dataTableController } from './store';
import PbButton from '../../Buttons/Button/Button.vue';

export default {
  name: 'PbDataTable',

  components: {
    ListData,
    EntityController,
    PbButton,
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

  methods: {
    openToNewEntity() {
      dataTableController.showEntityDrawer = true;
      dataTableController.entitySelected = {};
      dataTableController.indexEntity = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.data-table-container {}
</style>
