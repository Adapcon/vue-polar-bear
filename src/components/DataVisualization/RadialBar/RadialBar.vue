<template>
  <section class="radial-bar-container">
    <svg
      width="100"
      height="100"
    >
      <!-- Círculo de fundo -->
      <circle
        cx="50"
        cy="50"
        :r="radius"
        stroke="lightgray"
        stroke-width="10"
        fill="none"
      />
      <!-- Círculo de progresso -->
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
      >
        {{ computedValue }}
      </text>
    </svg>
    <p class="pb-light">
      {{ label }}
    </p>
    <div style="display: flex; flex-wrap: wrap">
      <p class="pb-strong">{{ goal }}/</p>
      <p class="pb-strong">{{ value }}</p>
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
    goal: { type: String, default: '' },
    value: { type: String, default: '' },
  },
  computed: {
    // Circunferência do círculo
    circumference() {
      return 2 * Math.PI * this.radius;
    },
    radius() {
      return 40;
    },
    // Deslocamento da linha do círculo
    offset() {
      return this.circumference - (this.percent / 100) * this.circumference;
    },
    computedValue() {
      return `${this.percent}%`;
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
    transition: stroke-dashoffset 0.5s ease;
  }
}
</style>
