<template>
  <div class="linear-progress-bar">
    <div class="progress">
      <div
        class="progress-inner"
        :style="{
          width: `${calcOffset()}%`,
          backgroundColor: `var(--color-${color})`,
        }"
      />
    </div>
    <div class="progress-info">
      <p class="pb label">{{ label }}</p>
      <p class="pb value">{{ computedValue }}</p>
    </div>
  </div>
</template>

<script>
import { validateColor } from '@pb/utils/validator';

export default {
  name: 'PbLinearBar',
  props: {
    label: {
      type: String,
      default: () => '',
    },
    color: {
      type: String,
      default: 'secondary',
      validator: color => validateColor(color),
    },
    percent: { type: Number, default: 0 },
    value: { type: String, default: '' },
  },

  data() {
    return {
      isLoaded: false,
    };
  },
  computed: {
    computedValue() {
      return this.value;
    },
  },

  mounted() {
    setTimeout(() => {
      this.isLoaded = true;
    }, 100);
  },

  methods: {
    calcOffset() {
      if (!this.isLoaded) return 0;
      return this.percent;
    },
  },
};
</script>

<style lang="scss" scoped>
.linear-progress-bar {
  width: 100%;
  margin: 10px 0;
}

.progress {
  height: 10px;
  border-radius: 10px;
  background-color: lightgray;
  position: relative;
}

.progress-inner {
  height: 10px;
  border-radius: 10px;
  transition: width 0.3s ease-in-out;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  font-size: 14px;
}

.label {
  color: var(--color-gray-40);
}

.value {
  color: var(--color-gray-40);
}
</style>
