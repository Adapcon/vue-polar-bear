<template>
  <section
    v-if="settings.showHeader"
    class="header-list-container pb-row"
  >
    <div
      v-for="(item, index) in tableSchema"
      :key="index"
      class="pb-col-2"
    >
      <div style="display: flex;">
        <small class="pb">
          {{ item.label }}
        </small>
        <PbSortIcon
          v-if="settings.showSortIcon"
          style="margin: 0 0 0 8px"
          color="var(--color-gray-90)"
        />
      </div>
    </div>
    <small class="pb pb-col">
      Ações
    </small>
  </section>
</template>

<script>
import PbSortIcon from '../../Miscellaneous/SortIcon/SortIcon.vue';

export default {
  name: 'HeaderList',
  components: {
    PbSortIcon,
  },

  props: {
    tableSchema: { type: Array, default: () => ([]) },
    settings: { type: Object, default: () => ({}) },
  },
};
</script>

<style lang="scss" scoped>
.header-list-container {
  background-color: var(--color-gray);
  padding: 8px;
  border-bottom: solid 1px #EEEEEE;
  border-radius: 5px 5px 0 0;
}
</style>
