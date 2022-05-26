<template>
  <div
    class="proceed-button-container disable-select"
    :class="{
      'disabled': disabled
    }"
  >
    <p class="pb">
      {{ title }}
    </p>

    <PbIcon
      icon="fas fa-arrow-up fa-rotate-90"
      style="color: var(--color-secondary);"
    />
  </div>
</template>

<script>
import PbIcon from '@pb/Miscellaneous/Icon/Icon';

export default {
  name: 'PbProceedButton',

  components: {
    PbIcon,
  },

  props: {
    title: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss" scoped>
.proceed-button-container {
  background: var(--color-gray) !important;
  padding: 12px 20px;
  border-radius: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
