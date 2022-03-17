<template>
  <section class="list-row-container">
    <div
      class="pb-row"
    >
      <div
        v-for="(item, index) in tableSchema"
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
      <div class="pb-col">
        <slot name="actions">
          <div class="pb-row">
            <PbButton
              class="pb-col-6"
              icon="fas fa-pen"
              @click.native="openToEdit"
            />
            <PbButton
              class="pb-col-6"
              icon="fas fa-trash"
              @click.native="$emit('delete-this')"
            />
          </div>
        </slot>
      </div>
      <hr class="line">
    </div>
  </section>
</template>

<script>
import PbButton from '../../Buttons/Button/Button.vue';
import { dataTableController } from './store';

export default {
  name: 'ListRow',
  components: { PbButton },
  props: {
    entity: { type: Object, default: () => ({}) },
    tableSchema: { type: Object, default: () => ({}) },
    indexEntity: { type: Number, default: 0 },
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

    openToEdit() {
      dataTableController.showEntityDrawer = true;
      dataTableController.entitySelected = { ...this.entity };
      dataTableController.indexEntity = this.indexEntity;
    },
  },

};
</script>

<style lang="scss" scoped>
.list-row-container {}
</style>
