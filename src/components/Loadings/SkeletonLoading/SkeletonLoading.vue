<template>
  <div
    class="items-container"
    :style="secondaryPosition"
  >
    <div
      class="main-item-content"
      :style="mainContainerSize"
    />
    <div
      class="secondary-item-content"
      :style="secondaryContainerSize"
    />
  </div>
</template>

<script>
export default {
  name: 'SkeletonLoading',
  props: {
    mainContainerDimensions: {
      type: Array,
      default: () => [0, 0],
    },
    secondaryContainerDimensions: {
      type: Array,
      default: () => [0, 0],
    },
    secondaryDirection: {
      type: String,
      default: 'column',
    },
    containersAlign: {
      type: String,
      default: 'center',
    },
    mainContainerRadius: {
      type: Number,
      default: 0,
    },
    marginBetweenItems: {
      type: Number,
      default: 12,
    },
  },

  computed: {
    mainContainerSize() {
      const [width, height] = this.mainContainerDimensions;
      return {
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: `${this.mainContainerRadius}px`,
      };
    },
    secondaryContainerSize() {
      const [width, height] = this.secondaryContainerDimensions;

      const responsiveMargins = {
        row: `0 0 0 ${this.marginBetweenItems}px`,
        column: `${this.marginBetweenItems}px 0 0 0`,
        'row-reverse': `0 ${this.marginBetweenItems}px 0 0`,
        'column-reverse': `0 0 ${this.marginBetweenItems}px 0`,
      };

      return {
        width: `${width}px`,
        height: `${height}px`,
        margin: responsiveMargins[this.secondaryDirection],
      };
    },
    secondaryPosition() {
      return {
        flexDirection: this.secondaryDirection,
        alignItems: this.containersAlign,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.items-container {
  display: flex;
  align-items: center;
  overflow: hidden;

  .main-item-content {
    background-color: var(--color-gray-10);
    flex-shrink: 0;
    animation: 1.5s opacity-blink infinite ease-in-out;
  }

  .secondary-item-content {
    background-color: var(--color-gray-10);
    flex-shrink: 0;
    animation: 1.5s opacity-blink infinite ease-in-out;
    margin-top: 12px;
  }
}
</style>
