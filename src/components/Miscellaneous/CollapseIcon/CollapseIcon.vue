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
    width: 16px;
    height: 16px;
    position: relative;

    span {
      width: 50%;
      height: 2px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%) rotateZ(45deg);
      border-radius: 1px;
      transition: transform .3s ease;
      &:nth-of-type(2) {
        left: calc(50% + -3px);
        transform: translateY(-50%) rotateZ(-45deg);
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
