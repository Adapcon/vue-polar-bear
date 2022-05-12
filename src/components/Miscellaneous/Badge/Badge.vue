<template>
  <div
    class="badge-container"
    :style="style"
  >
    <PbIcon
      v-if="hasIcon"
      :icon="icon"
      :class="iconClass"
      class="pb-icon"
    />
    <small
      :class="size"
    >
      {{ title }}
    </small>
  </div>
</template>

<script>
import { validateColor, isHexColor } from '@pb/utils/validator';
import PbIcon from '@pb/Miscellaneous/Icon/Icon';

export default {
  name: 'PbBadge',

  components: {
    PbIcon,
  },
  props: {
    icon: { type: String, default: '' },
    hasIcon: {
      type: Boolean,
      default: false,
    },
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
    wrapContent: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    style() {
      const backgroundColorIsHexColor = isHexColor(this.backgroundColor);

      return `
        background: ${backgroundColorIsHexColor ? this.backgroundColor : `var(--color-${this.backgroundColor})`} !important;
        color: var(--color-${this.color}) !important;
        display: ${this.wrapContent ? 'inline-flex' : ''};
      `;
    },
    iconClass() {
      switch (this.size) {
        case 'pb-sm':
          return 'fa-sm';
        case 'pb-md':
          return 'fa-sm';
        case 'pb-lg':
          return 'fa-lg';
        default:
          return 'fa';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.badge-container {
  text-align: center;
  padding: 3px 12px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  .pb-icon{
    margin-right: 10px;
    padding-block: 2px;
  }
}
</style>
