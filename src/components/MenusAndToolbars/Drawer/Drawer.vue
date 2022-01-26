<template>
  <div
    v-if="visible"
    class="drawer-container"
  >
    <div class="overlay">
      <div
        :class="drawerClass"
        class="drawer"
      >
        <div>
          <div class="header">
            <PbIcon
              class="close-button"
              icon="fas fa-times fa-lg"
              @click="close"
            />
            <slot name="header" />
          </div>
          <hr class="divider">
        </div>
        <div class="main">
          <slot name="main" />
        </div>
        <div>
          <hr class="divider">
          <div class="footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PbIcon from '@pb/Miscellaneous/Icon/Icon';

export default {
  name: 'PbDrawer',
  
  components: {
    PbIcon,
  },
  
  props: {
    /**
     * Defines the maximum width of the drawer for different device sizes.
     */
    widthMode: {
      type: String,
      default: 'mobile',
      validator: widthMode => ['desktop', 'mobile', 'tablet'].includes(widthMode),
    },
    /**
     * Controls whether the drawer is visible or not.
     */
    visible: {
      type: Boolean,
      default: false,
    },
  },
  
  emits: [
    /**
     * Event handler for closing the drawer.
     */
    'close',
  ],
  
  computed: {
    drawerClass() {
      return {
        'drawer-desktop': this.widthMode === 'desktop',
        'drawer-tablet': this.widthMode === 'tablet',
        'drawer-mobile': this.widthMode === 'mobile',
      };
    },
  },
  
  methods: {
    close() {
      this.$emit('close', this.visible);
    },
  },
};
</script>

<style lang="scss" scoped>
.drawer-container {
  position: absolute;
  top: 0;
  right: 0;

  .overlay {
    min-width: 100vw;
    min-height: 100vh;
    width: 100%;
    height: 100%;
    background-color: var(--color-overlay);
    display: flex;
    justify-content: right;
  }

  .drawer {
    width: 100%;
    background-color: var(--color-white);
    box-shadow: 0 1px 10px rgba(34, 34, 34, .1);
    flex-direction: column;
    display: flex;

    &-desktop {
      max-width: 880px;
    }

    &-tablet {
      max-width: 600px;
    }

    &-mobile {
      max-width: 375px;
    }

    .header {
      display: flex;
      flex-direction: column;
      padding: 20px;
    }

    .main {
      padding: 20px;
      flex-grow: 1;
    }

    .footer {
      display: flex;
      flex-direction: column;
      padding: 20px;
    }

    .divider {
      height: 1px;
      width: 100%;
      border: 1px solid var(--color-gray-5);
      margin: 0;
      box-sizing: border-box;
    }

    .close-button {
      cursor: pointer;
      align-self: end;
      margin-bottom: 20px;
    }
  }
}
</style>