<template>
  <div class="pb-fieldset-container">
    <div class="pb-fieldset-title" :style="`color: var(--color-${color})`">
      <small class="pb">{{ title }}</small>
    </div>
    <div class="pb-fieldset-slot">
      <slot />
    </div>
  </div>
</template>

<script>
import { validateColor } from '@pb/utils/validator';

export default {
  name: 'PbFieldset',
  props: {
    title: { type: String, default: '' },
    color: {
      type: String,
      default: 'gray-20',
      validator: validateColor,
    },
  },
};
</script>

<style lang="scss" scoped>
.pb-fieldset-container {
  display: flex;
  flex-direction: column;
  width: 100%;

  .pb-fieldset-title {
    margin-bottom: 4px;
    flex: 1;
  }

  .pb-fieldset-slot {
    flex: 1;
  }
}
</style>
