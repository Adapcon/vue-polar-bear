<template>
  <div class="badge-container" :style="style">
    <small :class="size">
      {{ title }}
    </small>
  </div>
</template>

<script>
import { validateColor, isHexColor } from '@pb/utils/validator';

export default {
  name: 'PbBadge',

  props: {
    size: {
      type: String,
      default: 'pb-sm',
      validator: size => [
        'pb-sm',
        'pb-md',
        'pb-lg',
      ].indexOf(size) !== -1,
    },
    title: { type: String, default: '' },
    backgroundColor: {
      type: String,
      default: 'primary',
      validator: color => validateColor(color) || isHexColor(color),
    },
    color: {
      type: String,
      default: 'white',
      validator: color => validateColor(color),
    },
  },

  computed: {
    style() {
      const backgroundColorIsHexColor = isHexColor(this.backgroundColor);
      return `
        background: ${backgroundColorIsHexColor ? this.backgroundColor : `var(--color-${this.backgroundColor})`} !important;
        color: var(--color-${this.color}) !important;
      `;
    },

  },
};
</script>

<style lang="scss" scoped>
.badge-container {
  text-align: center;
  padding: 3px 12px;
  border-radius: 20px;
}
</style>
