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
      <slot name="actions" />
      <hr class="line">
    </div>
  </section>
</template>

<script>
export default {
  name: 'ListRow',

  props: {
    entity: { type: Object, default: () => ({}) },
    tableSchema: { type: Object, default: () => ({}) },
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
  },

};
</script>

<style lang="scss" scoped>
.list-row-container {}
</style>
