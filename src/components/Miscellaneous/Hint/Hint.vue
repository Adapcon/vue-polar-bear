<template>
  <div class="pb-hint-container">
    <div
      class="pb-hint-slot"
      @mouseenter="state.showHint = true"
      @mouseleave="state.showHint = false"
    >
      <slot />
    </div>
    <div
      v-if="!disabled && state.showHint"
      class="pb-hint layer-always-on-top"
      style="pointer-events: none;"
      :style="`background-color: var(--color-${color})`"
      :class="`pb-hint-${position}`"
    >
      <small class="pb">{{ hintText }}</small>

      <slot name="hint-body" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PbHint',
  props: {
    position: {
      type: String,
      default: 'bottom-left',
      validator: position => [
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
      ].indexOf(position) !== -1,
    },
    color: { type: String, default: 'primary' },
    hintText: { type: [String, Number], default: '' },
    disabled: { type: Boolean, default: false },
  },
  data() {
    return {
      state: {
        showHint: false,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
  .pb-hint-container {
    position: relative;
    display: inline;

    .pb-hint-slot {
      display: inline;
    }

    .pb-hint {
      position: absolute;
      color: var(--color-white);
      padding: 9px 20px;
      overflow: hidden;
      white-space: nowrap;
      border-radius: 20px;
    }

    @mixin pb-hint-bottom {
      bottom: -5px;
      transform: translateY(100%);
    }

    @mixin pb-hint-top {
      top: -5px;
      transform: translateY(-100%);
      margin-bottom: 5px;
    }

    .pb-hint-bottom-left {
      @include pb-hint-bottom;
      border-top-right-radius: 0px;
      right: 50%;
    }

    .pb-hint-bottom-right {
      @include pb-hint-bottom;
      border-top-left-radius: 0px;
      left: 50%;
    }

    .pb-hint-top-right {
        @include pb-hint-top;
        border-bottom-left-radius: 0px;
        left: 50%;
    }

    .pb-hint-top-left {
        @include pb-hint-top;
        border-bottom-right-radius: 0px;
        right: 50%;
    }
  }
</style>
