<template>
  <div
    class="linear-progress-bar"
    :class="{ 'horizontal-value': horizontalValue }"
  >
    <div
      class="progress"
      :style="`width: ${barWidth}${widthTypeOptions[widthType]}; margin-bottom: 0;`"
    >
      <div
        class="progress-inner"
        :style="{
          width: `${calcOffset()}%`,
          backgroundColor: `var(--color-${color})`,
        }"
      />
    </div>
    <div
      class="progress-info"
      :style="`max-width: ${barWidth}${widthTypeOptions[widthType]}`"
    >
      <p class="pb label">{{ label }}</p>
      <p class="pb value">{{ computedValue }}</p>
    </div>
  </div>
</template>

<script>
import { validateColor, validateWidthType } from '@pb/utils/validator';

export default {
  name: 'PbLinearBar',
  props: {
    barWidth: {
      type: Number,
      default: 100,
    },
    widthType: {
      type: String,
      validator: value => validateWidthType(value),
      default: 'percent',
    },
    horizontalValue: {
      type: Boolean,
      default: true,
    },
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
      widthTypeOptions: {
        percent: '%',
        pixels: 'px',
        'viewport-width': 'vw',
      },
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

.horizontal-value {
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress {
  height: 10px;
  border-radius: 10px;
  background-color: lightgray;
  position: relative;
  margin-bottom: 5px;
}

.progress-inner {
  height: 10px;
  border-radius: 10px;
  transition: width 0.3s ease-in-out;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  align-items: center
}

.label {
  color: var(--color-gray-40);
}

.value {
  color: var(--color-gray-40);
  margin-left: 12px!important;
}
</style>
