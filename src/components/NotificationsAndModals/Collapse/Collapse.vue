<template>
  <div class="pb-collapse-container">
    <PbButton
      :label="buttonLabel"
      :color="buttonColor"
      :icon="buttonIcon"
      icon-position="right"
      @click.native="collapseHandler"
    />

    <transition name="fade">
      <div
        v-if="showCollapse"
        class="layer-always-on-top"
        :class="collapseClass"
        :style="collapseBodyStyle"
      >
        <div
          class="collapse-body"
        >
          <h3 class="pb">
            <b class="pb">
              {{ collapseTitle }}
            </b>
          </h3>

          <slot />

          <div class="actions">
            <slot name="actions" />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import PbButton from '@pb/Buttons/Button/Button';
import { validateColor } from '@pb/utils/validator';

export default {
  name: 'PbCollapse',

  components: {
    PbButton,
  },

  props: {
    show: { type: Boolean, default: false },
    buttonLabel: { type: String, default: '' },
    buttonColor: {
      type: String,
      default: 'primary',
      validator: color => validateColor(color),
    },
    buttonIcon: { type: String, default: '' },
    collapseTitle: { type: String, default: '' },
    position: {
      type: String,
      default: 'bottom-right',
      validator: position => [
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
      ].includes(position),
    },
    isMobile: { type: Boolean, default: false },
    bodyWidth: { type: Number, default: 300 },
    bodyHeight: { type: Number, default: 300 },
  },

  computed: {
    collapseClass() {
      if (this.isMobile)
        return 'collapse-content-mobile';

      return `collapse-content pb-collapse-${this.position}`;
    },

    collapseBodyStyle() {
      return {
        'min-width': `${this.bodyWidth}px`,
        'min-height': `${this.bodyHeight}px`,
      };
    },

    showCollapse: {
      get() {
        return this.show;
      },

      set(val) {
        this.$emit('update:show', val);
      },
    },
  },

  methods: {
    collapseHandler() {
      this.showCollapse = !this.showCollapse;
      this.$emit('on-collapse', this.showCollapse);
    },
  },
};
</script>

<style lang="scss" scoped>
.pb-collapse-container {
  position: relative;
  @mixin collapse-body-base {
    padding: 30px;
    border-radius: 0px 40px 40px;
    background: var(--color-white);
  }

  .collapse-content {
    @include collapse-body-base;
    position: absolute;
    overflow: hidden;
    white-space: nowrap;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

    .actions {
      position: absolute;
      bottom: 30px;
      right: 30px;
    }
  }

  .collapse-content-mobile {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    color: var(--color-gray-20);

    .collapse-body {
      @include collapse-body-base;
      margin: 0 auto;
      background: var(--color-white);
      position: relative;

      .actions {
        position: absolute;
        bottom: 30px;
        right: 30px;
      }
    }
  }

  @mixin pb-collapse-bottom {
    bottom: -5px;
    transform: translateY(100%);
  }

  @mixin pb-collapse-top {
    top: -5px;
    transform: translateY(-100%);
    margin-bottom: 5px;
  }

  .pb-collapse-bottom-left {
    @include pb-collapse-bottom;
    border-top-right-radius: 0px;
    right: 50%;
  }

  .pb-collapse-bottom-right {
    @include pb-collapse-bottom;
    border-top-left-radius: 0px;
    left: 50%;
  }

  .pb-collapse-top-right {
      @include pb-collapse-top;
      border-bottom-left-radius: 0px;
      left: 50%;
  }

  .pb-collapse-top-left {
      @include pb-collapse-top;
      border-bottom-right-radius: 0px;
      right: 50%;
  }
}
</style>
