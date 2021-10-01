<template>
  <div class="progress-bar-wrapper">
    <div class="progress-bar-labels">
      <div
        v-for="checkpoint of checkpoints"
        :key="checkpoint.label"
        :style="`width: ${checkpoint.size || 100}%`"
      >
        <p class="pb" :style="`color: var(--color-${labelColor});`">{{ checkpoint.label }}</p>
      </div>
    </div>
    <div
      class="progress-bar-container"
      :style="`background-color: var(--color-${backgroundColor})`"
    >
      <div
        class="progress-bar"
        :style="`
          width: ${progress}%;
          background: var(--color-${color});
        `"
      />
    </div>
  </div>
</template>

<script>
import { validateColor } from '@pb/utils/validator';

export default {
  name: 'PbProgressBar',
  props: {
    checkpoints: {
      type: Array,
      default: () => [],
      validator: checkpoints => checkpoints.every(checkpoint => checkpoint.label)
        && (checkpoints.every(checkpoint => checkpoint.size) || checkpoints.every(checkpoint => !checkpoint.size)),
    },
    labelColor: {
      type: String,
      default: 'secondary',
      validator: color => validateColor(color),
    },
    backgroundColor: {
      type: String,
      default: 'gray-10',
      validator: color => validateColor(color),
    },
    color: {
      type: String,
      default: 'secondary',
      validator: color => validateColor(color),
    },
    progress: { type: Number, default: 0 },
  },
};
</script>

<style lang="scss" scoped>
.progress-bar-wrapper {

  .progress-bar-container {
    width: 100%;
    height: 5px;
    border-radius: 10px;

    .progress-bar {
      border-radius: 10px;
    }
  }

  .progress-bar-labels {
    display: flex;
    text-align: center;

    div:nth-child(1) {
      text-align: left;
    }

    div:nth-last-child(1) {
      text-align: right;
    }
  }
}
</style>
