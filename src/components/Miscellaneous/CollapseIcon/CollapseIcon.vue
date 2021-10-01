<template>
  <div
    class="pb-collapse-icon"
    :class="{ 'toggle-collapse-icon-up': isIconUp }"
  >
    <span :style="`background: ${color}`" />
    <span :style="`background: ${color}`" />
  </div>
</template>

<script>
export default {
  name: 'PbCollapseIcon',
  props: {
    isIconUp: { type: Boolean, default: false },
    color: { type: String, default: 'var(--color-secondary)' },
  },
};
</script>

<style lang="scss" scoped>
  .pb-collapse-icon {
    width: 24px;
    height: 24px;
    position: relative;

    span {
      width: 50%;
      height: 3px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%) rotateZ(35deg);
      border-radius: 1.5px;
      transition: transform .3s ease;
      &:nth-of-type(2) {
        left: calc(50% + -4px);
        transform: translateY(-50%) rotateZ(-35deg);
      }
    }
  }

  .toggle-collapse-icon-up {
    span {
      transform: translateY(-50%) rotateZ(-35deg);
      &:nth-of-type(2) {
        transform: translateY(-50%) rotateZ(35deg);
      }
    }
  }
</style>
