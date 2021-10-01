<template>
  <div class="pb-loading-bar-container" :style="bold ? 'height: 4px' : ''">
    <div
      class="pb-loading-bar"
      :style="`background-color: var(--color-${color});`"
    />
  </div>
</template>

<script>
import { validateColor } from '@pb/utils/validator';

export default {
  name: 'PbLoadingBar',
  props: {
    color: {
      type: String,
      default: 'primary',
      validator: color => validateColor(color),
    },
    bold: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.pb-loading-bar-container {
  height: 2px;
  width: 100%;
  overflow: hidden;

  @keyframes progress-animation {
    0% {width: 0%;}
    20% {transform: translateX(0);}
    50% {width: 100%;}
    100% {transform: translateX(100%)}
  }

  .pb-loading-bar {
    height: 100%;
    width: 100%;
    border-radius: 100px;
    animation: progress-animation 2s ease infinite;
  }
}
</style>
