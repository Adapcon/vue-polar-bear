<template>
  <section class="radial-bar-container">
    <svg
      width="100"
      height="100"
    >
      <circle
        cx="50"
        cy="50"
        :r="radius"
        stroke="lightgray"
        stroke-width="10"
        fill="none"
      />
      <circle
        cx="50"
        cy="50"
        :r="radius"
        :stroke="`var(--color-${color})`"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="offset"
        stroke-width="10"
        fill="none"
        stroke-linecap="round"
        transform="rotate(-90 50 50)"
      />
      <text
        x="50"
        y="50"
        text-anchor="middle"
        dominant-baseline="middle"
        class="text"
        :style="fontSize"
      >
        {{ computedValue }}
      </text>
    </svg>
    <p class="pb">
      {{ label }}
    </p>
    <div style="display: flex; flex-wrap: wrap">
      <p class="pb-strong">{{ value }}/</p>
      <p class="pb-strong">{{ goal }}</p>
    </div>
  </section>
</template>

<script>
import { validateColor } from '@pb/utils/validator';

export default {
  name: 'PbRadialBar',
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
    goal: { type: [Number, String], default: '' },
    value: { type: [Number, String], default: '' },
  },

  data() {
    return {
      isLoaded: false,
      radius: 40,

    };
  },
  computed: {
    circumference() {
      return 2 * Math.PI * this.radius;
    },
    offset() {
      if (!this.isLoaded) return this.calcOffset(0);
      return this.calcOffset(this.percent);
    },
    computedValue() {
      return `${this.percent}%`;
    },
    fontSize() {
      const sizeValue = this.computedValue.length;

      const sizesMap = {
        2: () => 'font-size: 20px',
        3: () => 'font-size: 20px',
        4: () => 'font-size: 20px',
        5: () => 'font-size: 18px',
        6: () => 'font-size: 15px',
        7: () => 'font-size: 14px',
        8: () => 'font-size: 13px',
      };

      const style = sizesMap[sizeValue]?.() ?? 'font-size: 12px';

      return style;
    },
  },
  mounted() {
    setTimeout(() => {
      this.isLoaded = true;
    }, 100);
  },

  methods: {
    calcOffset(percent) {
      const offset = this.circumference - (percent / 100) * this.circumference;
      return offset > 0 ? offset : 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.radial-bar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100px;

  .text {
    font-size: 16px;
    font-weight: bold;
    font-family: nunito;
  }

  circle[stroke-dashoffset] {
    transition: stroke-dashoffset 0.8s ease;
  }
}
</style>
