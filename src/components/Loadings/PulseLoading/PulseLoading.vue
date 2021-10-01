<template>
  <div
    class="pulse-loading-container"
    :style="{
      'width': size,
      'height': size,
    }"
  >
    <div
      class="spinner"
      :style="{
        'border-color': `var(--color-${color})`,
        'border-width': `${borderWidth}px`,
      }"
    />
  </div>
</template>

<script>
import { validateColor } from '@pb/utils/validator';

export default {
  name: 'PbPulseLoading',

  props: {
    color: {
      type: String,
      default: 'gray-80',
      validator: color => validateColor(color),
    },

    size: {
      type: String,
      default: '80px',
    },

    borderWidth: {
      type: Number,
      default: 12,
    },
  },
};
</script>

<style lang="scss" scoped>
  .pulse-loading-container {
    position: relative;

    .spinner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      border-style: solid;
      animation: 1.5s pulse-loading infinite ease-in-out;
    }
  }
</style>
