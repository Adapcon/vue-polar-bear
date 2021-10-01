<template>
  <div :style="chartContainerStyle" :class="chartContainerClasses">
    <div
      v-for="( barInfo, index ) of chartData"
      :key="`bar-${index}`"
      class="chart-column"
    >
      <div class="chart-bar-wrapper" :style="chartBarWrapperStyle">
        <div
          class="chart-bar"
          :style="{
            ...chartBarStyle(barInfo.value),
            'background-color': `var(--color-${barsColor})`,
          }"
        >
          <small v-if="showValue" class="pb" :style="{color: `var(--color-${valueColor})`}">
            {{ barInfo.displayValue || barInfo.value }}
          </small>
        </div>
      </div>

      <small
        v-if="barInfo.title"
        class="pb bar-title"
        :style="{color: `var(--color-${titleColor}) !important`}"
      >
        {{ barInfo.title }}
      </small>

      <PbIcon
        v-if="barInfo.icon"
        :icon="`${barInfo.icon} fa-lg`"
        :style="{ ...iconStyle, color: `var(--color-${iconColor}) !important` }"
      />
    </div>
  </div>
</template>

<script>
import { validateColor } from '@pb/utils/validator';

const defaultColorParams = {
  type: String,
  default: 'gray-20',
  validator: color => validateColor(color),
};

export default {
  name: 'PbBarChart',

  components: {
    PbIcon: () => import('@pb/Miscellaneous/Icon/Icon'),
  },

  props: {
    chartData: { type: Array, default: () => [] },
    showValue: { type: Boolean, default: true },
    highestBarSize: { type: Number, default: 100 },
    barsColor: defaultColorParams,
    titleColor: defaultColorParams,
    iconColor: defaultColorParams,
    valueColor: defaultColorParams,
    chartAxis: {
      type: String,
      default: 'vertical',
      validator: axis => axis === 'vertical' || axis === 'horizontal',
    },
  },

  computed: {
    sortedChartDataFromHighValue() {
      return [...this.chartData]
        .sort((a, b) => b.value - a.value);
    },

    highestValueOfChartData() {
      return this.sortedChartDataFromHighValue[0].value;
    },

    isHighestValueNumber() {
      return this.isNumber(this.highestValueOfChartData);
    },

    isAxisVertical() {
      return this.chartAxis === 'vertical';
    },

    chartContainerStyle() {
      return this.isAxisVertical
        ? { 'grid-template-columns': `repeat(${this.chartData.length}, minmax(0, 1fr))` }
        : { 'grid-template-rows': `repeat(${this.chartData.length}, minmax(0, 1fr))` };
    },

    chartContainerClasses() {
      return this.isAxisVertical
        ? 'pb-chart-container pb-chart-vertical'
        : 'pb-chart-container pb-chart-horizontal';
    },

    chartBarWrapperStyle() {
      return this.isAxisVertical
        ? { height: `${this.highestBarSize}px` }
        : { width: `${this.highestBarSize}px` };
    },

    iconStyle() {
      return this.isAxisVertical
        ? { 'margin-top': '6px' }
        : { 'margin-right': '6px' };
    },

  },

  methods: {
    getChartBarHeight(value) {
      return this.isHighestValueNumber && this.isNumber(value)
        ? Number(value) / Number(this.highestValueOfChartData) * 100
        : 0;
    },

    isNumber(value) {
      return !Number.isNaN(Number(value));
    },

    chartBarStyle(value) {
      return this.isAxisVertical
        ? { height: `${this.getChartBarHeight(value)}%` }
        : { width: `${this.getChartBarHeight(value)}%` };
    },
  },
};
</script>

<style lang="scss" scoped>
.pb-chart-container {
  position: relative;
  display: grid;
  gap: 10px;

  .chart-column {
    display: flex;

    .bar-title { line-height: 120% !important }

    .chart-bar-wrapper {
      position: relative;

      .chart-bar {
        position: absolute;
        transition: all .3s ease;

        small { position: absolute }
      }
    }
  }
}

.pb-chart-vertical {
  width: 100%;

  .chart-column {
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    .bar-title {
      width: 100%;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .chart-bar-wrapper {
      width: 100%;
      margin-bottom: 6px;

      .chart-bar {
        width: 90%;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);

        small {
          left: 50%;
          top: -20px !important;
          transform: translateX(-50%);
        }
      }
    }
  }
}

.pb-chart-horizontal {
  height: 100%;

  .chart-column {
    flex-direction: row-reverse;
    align-items: center;
    justify-content: flex-start;

    .bar-title {
      text-align: left;
    }

    .chart-bar-wrapper {
      height: 100%;
      margin-left: 10px;
      flex-shrink: 0;

      .chart-bar {
        height: 90%;
        top: 50%;
        left: 0;
        transform: translateY(-50%);

        small {
          right: -20px;
          bottom: 50%;
          transform: translateY(50%);
        }
      }
    }
  }
}
</style>
