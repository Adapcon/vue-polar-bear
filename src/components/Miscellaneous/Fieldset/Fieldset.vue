<template>
  <div class="pb-fieldset-container">
    <div
      class="pb-fieldset-title"
      :style="`color: var(--color-${color})`"
    >
      <small class="pb">{{ title }}<span
        v-if="required"
        style="color: var(--color-warning)"
      > *</span><PbHint
        v-if="info"
        color="info"
        :hint-text="info"
        position="top-right"
      ><span style="color: var(--color-info);"> ?</span></PbHint></small>
    </div>
    <div class="pb-fieldset-slot">
      <slot />
    </div>
  </div>
</template>

<script>
import { validateColor } from '@pb/utils/validator';
import PbHint from '../Hint/Hint.vue';

export default {
  name: 'PbFieldset',

  components: {
    PbHint,
  },

  props: {
    title: { type: String, default: '' },
    info: { type: String, default: '' },
    color: {
      type: String,
      default: 'gray-20',
      validator: validateColor,
    },
    required: {
      type: Boolean,
      default: false,
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
