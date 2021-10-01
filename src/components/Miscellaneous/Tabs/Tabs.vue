<template>
  <div
    class="tabs-header"
    :style="style"
  >
    <template v-for="(label, tab) in tabs">
      <p
        :key="tab"
        class="pb tab-title"
        @click="$emit('update:selected-tab', tab)"
      >
        <template v-if="selectedTab === tab">
          <b class="pb" :style="`color: var(--color-${color})`">
            {{ label }}
          </b>

          <hr :style="`margin: 10px 0 0 0; border: 1px solid var(--color-${color})`">
        </template>
        <template v-else>{{ label }}</template>
      </p>
    </template>
  </div>
</template>

<script>
import { validateColor } from '@pb/utils/validator';

export default {
  name: 'PbTabs',

  props: {
    tabs: { type: Object, default: () => ({}) },
    selectedTab: { type: String, default: '' },
    color: {
      type: String,
      default: 'primary',
      validator: validateColor,
    },
    hideBorder: { type: Boolean, default: false },
  },

  computed: {
    style() {
      if (this.hideBorder)
        return;

      return 'border-bottom: 1px solid';
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs-header {
  width: 100%;
  display: flex;
  color: var(--color-gray-20);
  flex-wrap: wrap;

  .tab-title {
    margin-right: 21px !important;
    user-select: none;
    cursor: pointer;
  }
}
</style>
