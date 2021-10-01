<template>
  <div class="pb-extra-actions-container">
    <div
      class="pb-extra-actions-toggle"
      :class="[state.active && 'pb-extra-actions-toggle-active']"
      @click.stop="extraActionsToggle()"
    >
      <div class="toggle-open-button">
        <span /><span /><span />
      </div>

      <div class="toggle-close-button">
        <span /><span />
      </div>
    </div>

    <div
      ref="actionsContent"
      class="pb-extra-actions-wrapper"
      :class="[state.isActionsVisible && 'pb-extra-actions-wrapper-active']"
    >
      <slot v-if="state.active" />
    </div>
  </div>
</template>

<script>
export default {
  // SUGG - the component might accept different orientations and directions
  name: 'PbExtraActions',
  props: {
    animate: { type: Boolean, default: true },
    initialState: {
      type: String,
      default: 'closed',
      validator: state => ['open', 'closed'].includes(state),
    },
  },
  data() {
    return {
      state: {
        active: this.initialState === 'open',
        isActionsVisible: this.initialState === 'open',
      },
    };
  },
  methods: {
    open() {
      this.state.active = true;
      this.animation(this.show);
      this.$emit('open');
    },

    close() {
      this.state.active = false;
      this.animation(this.hide);
      this.$emit('close');
    },

    show() {
      this.state.isActionsVisible = true;
    },

    hide() {
      this.state.isActionsVisible = false;
    },

    toggleActive() {
      return this.state.active ? this.close() : this.open();
    },

    toggleActionsVisibility() {
      return this.state.isActionsVisible ? this.hide() : this.show();
    },

    animation(callback) {
      if (!this.animate)
        return this.toggleActionsVisibility();

      // TODO
      // Search for better alternatives to this approach (setTimeout).
      // FYI -> Already tried to implement $nextTick
      setTimeout(() => {
        const slotChildren = this.$refs.actionsContent?.children || [];

        for (let i = 0; i < slotChildren.length; i++) {
          const delay = (slotChildren.length - i) / 20;

          slotChildren[i]
            .style['transition-delay'] = `${delay}s`;
        }

        callback();
      }, 0);
    },

    extraActionsToggle() {
      this.toggleActive();
    },
  },
};
</script>

<style lang="scss" scoped>
.pb-extra-actions-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: flex-start;
  transition: all .2s ease;

  .pb-extra-actions-toggle {
    position: relative;
    width: 43px;
    height: 19px;
    user-select: none;
    cursor: pointer;

    .toggle-open-button {
      span {
        position: absolute;
        left: 10px;
        top: 8px;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: #bbb;
        transition: all .2s ease;
        &:nth-of-type(2) {
          left: 18px;
        }
        &:nth-of-type(3) {
          left: 26px;
        }
      }
    }

    .toggle-close-button {
      padding: 10px;
      span {
        position: absolute;
        width: 0px;
        height: 2px;
        border-radius: 2px;
        left: 50%;
        top: 50%;
        background: #bbb;
        transition: width .2s ease, transform .2s ease;
        &:nth-of-type(1) {
          transform: translate(-50%, -50%) rotateZ(0);
        }
        &:nth-of-type(2) {
          transform: translate(-50%, -50%) rotateZ(0);
        }
      }
    }
  }

  .pb-extra-actions-toggle-active {
    .toggle-open-button {
      span {
        &:nth-of-type(1),
        &:nth-of-type(3) {
          left: 18px;
          opacity: 0;
        }
        &:nth-of-type(2) {
          transform: scale(2);
          opacity: 0;
        }
      }
    }

    .toggle-close-button {
      span {
        width: 18px;
        &:nth-of-type(1) {
          transform: translate(-50%, -50%) rotateZ(45deg);
        }
        &:nth-of-type(2) {
          transform: translate(-50%, -50%) rotateZ(-45deg);
        }
      }
    }
  }

  .pb-extra-actions-wrapper {
    display: flex;
    justify-content: center;
    * {
      opacity: 0;
      transition: all .3s ease;
    }
  }

  .pb-extra-actions-wrapper-active {
    * {
      opacity: 1;
    }
  }
}
</style>
